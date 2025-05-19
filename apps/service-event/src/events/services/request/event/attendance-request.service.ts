import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventSchema } from '../../../entites/event/event.schema';
import { RewardRequestInfo, RewardRequestInfoSchema } from '../../../entites/request/reward-request-history.schema';
import { RequestEventFactory } from '../factory/event-factory.factory';
import { RequestEventHandler } from '../factory/event-factory.factory';
import { RewardRequestService } from '../interface/reward-request.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AttendanceRewardService implements RewardRequestService,RequestEventHandler {
	constructor(
			@InjectModel(RewardRequestInfo.name) private rewardRequestModel: Model<RewardRequestInfoSchema>,
			@InjectModel(Event.name) private eventModel: Model<EventSchema>,
			@Inject('GATEWAY_URL') private readonly gatewayUrl: string,
			eventFactory: RequestEventFactory,
			private readonly httpService: HttpService,
		) {
			eventFactory.registerHandler('attendance', this);
		}

	async processRewardRequest(eventId: string, userId: string): Promise<any> {
		const isValid = await this.checkRewardCondition(eventId, userId);

		const session = await this.rewardRequestModel.db.startSession();
		session.startTransaction();

		try {
			const existingRequest = await this.rewardRequestModel.findOne({ 
				userId,
				eventId 
			}).session(session);

			// 기존 요청 존재 시 업데이트, 없으면 새로 생성
			const updateData: any = {
				$set: { status: 'processing' },
				$setOnInsert: { requestedAt: new Date() }
			};

			if (!isValid) {
				updateData.$set.status = 'failed';
				updateData.$push = { errorLog: '조건을 충족하지 못했습니다.' };
				
				const result = await this.rewardRequestModel.findOneAndUpdate(
					{ userId, eventId },
					updateData,
					{ 
						upsert: true, 
						new: true, 
						session,
						setDefaultsOnInsert: true 
					}
				);

				await session.commitTransaction();
				return { message: '조건을 충족하지 못했습니다.' };

			} else {
				const approvalType = await this.getApprovalType(eventId);

				if (approvalType === 'manual') {
					await this.grantReward(userId, eventId);
					updateData.$set.status = 'pending';
					
				} else {
					updateData.$set.status = 'completed';
					updateData.$set.rewardedAt = new Date();
				}

				const result = await this.rewardRequestModel.findOneAndUpdate(
					{ userId, eventId },
					updateData,
					{ 
						upsert: true, 
						new: true, 
						session,
						setDefaultsOnInsert: true 
					}
				);

				await session.commitTransaction();
				return { 
					message: approvalType === 'manual' 
						? '요청이 완료되었습니다.' 
						: '보상이 지급되었습니다.' 
				};
			}

		} catch (e) {
			await session.abortTransaction();
			await this.rewardRequestModel.findOneAndUpdate(
				{ userId, eventId },
				{ 
					$set: { status: 'failed' },
					$push: { errorLog: e.message } 
				},
				{ upsert: true }
			);
			return { message: '요청이 실패했습니다.', error: e.message };

		} finally {
			session.endSession();
		}
	}

	async getApprovalType(eventId: string): Promise<'auto' | 'manual'> {
		const event = await this.eventModel.findById(eventId);
		if (!event) {
			throw new Error('Event not found');
		}
		return (event.approvalType === 'auto' || event.approvalType === 'manual' ? event.approvalType : 'auto');
	}

	async checkRewardCondition(eventId: string, userId: string): Promise<boolean> {
		const event = await this.eventModel.findById(eventId);
		if (!event) {
			throw new Error('Event not found');
		}

		try {
			const { data: loginDays } = await firstValueFrom(
				this.httpService.post(
					`${this.gatewayUrl}/api/service/history`,
					{
						userId: userId,
						startDate: event.startDate,
						endDate: event.endDate,
					},
					{
						headers: {
							'X-Internal-Request': 'true'
						}
					}
				)
			);

			return loginDays >= event.condition;

		} catch (e) {
			throw new Error('Failed to fetch login history');
		}
	}

	async grantReward(userId: string, eventId: string): Promise<void> {
		//운영자 및 관리자 승인 후 보상 지급
	}
}