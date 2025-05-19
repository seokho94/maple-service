import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, PipelineStage } from 'mongoose';
import { RewardRequestInfo, RewardRequestInfoSchema } from '../../entites/request/reward-request-history.schema';
import { Event, EventSchema } from '../../entites/event/event.schema';
import { RequestEventFactory } from './factory/event-factory.factory';
import { GetRewardHistoryDto } from '../../dtos/request/get-reward-history.dto';

// 응답 타입 정의
export class RewardRequestHistoryResponse {
	userId: string;
	requestedAt: Date;
	eventTitle: string;
	eventStartDate: Date;
	eventEndDate: Date;
	status: string;
	isRewarded: boolean;
}

// 페이지네이션 응답 타입
export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	totalPages: number;
}

@Injectable()
export class CommonRequestService {
	constructor(
		@InjectModel(RewardRequestInfo.name) 
		protected rewardRequestModel: Model<RewardRequestInfoSchema>,
		@InjectModel(Event.name) 
		protected eventModel: Model<EventSchema>,
		protected requestEventFactory: RequestEventFactory
	) {}

	async processRewardRequest(eventId: string, userId: string): Promise<any> {
		const event = await this.eventModel.findById(eventId);
		if (!event) {
			throw new Error('이벤트를 찾을 수 없습니다.');
		}
		return this.requestEventFactory.getHandler(event.eventType)
		.processRewardRequest(eventId, userId);
	}

	async getRewardRequestHistory(
		params: GetRewardHistoryDto
	): Promise<PaginatedResponse<RewardRequestHistoryResponse>> {
		return this.getRequestHistory(params);
	}

	async getAllRewardRequestHistory(
		params: GetRewardHistoryDto
	): Promise<PaginatedResponse<RewardRequestHistoryResponse>> {
		console.log(`getRewardRequest: ${JSON.stringify(params)}`);
		return this.getRequestHistory(params);
	}

	async getRequestHistory(
		params: GetRewardHistoryDto
	): Promise<PaginatedResponse<RewardRequestHistoryResponse>> {
		const { userId, eventId, isRewarded, status, page = 1, limit = 10 } = params;
		const skip = (page - 1) * limit;

		const matchStage: Record<string, any> = {};
		if (userId) matchStage.userId = userId;
		if (eventId) matchStage.eventId = eventId;
		if (typeof isRewarded === 'boolean') matchStage.isRewarded = isRewarded;
		if (status) matchStage.status = status;

		const pipeline: PipelineStage[] = [];
		
		if (Object.keys(matchStage).length > 0) {
			pipeline.push({ $match: matchStage });
		}

		pipeline.push(
			{ $sort: { requestedAt: -1 } },
			{ $skip: skip },
			{ $limit: limit },
			{
				$lookup: {
					from: 'event_infos',
					localField: 'eventId',
					foreignField: '_id',
					as: 'eventInfo'
				}
			},
			{ $unwind: { path: '$eventInfo', preserveNullAndEmptyArrays: true } },
			{
				$project: {
					userId: 1,
					requestedAt: 1,
					status: 1,
					isRewarded: 1,
					eventTitle: '$eventInfo.title',
					eventStartDate: '$eventInfo.startDate',
					eventEndDate: '$eventInfo.endDate'
				}
			}
		);

		const [total, data] = await Promise.all([
			this.rewardRequestModel.countDocuments(matchStage),
			this.rewardRequestModel.aggregate(pipeline)
		]);

		return {
			data: data as RewardRequestHistoryResponse[],
			total,
			page,
			totalPages: Math.ceil(total / limit)
		};
	}
}