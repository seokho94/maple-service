import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from '../../dtos/event/create-event.dto';
import { CreateRewardDto } from '../../dtos/reward/create-reward.dto';
import { Event, EventSchema } from '../../entites/event/event.schema';
import { Reward, RewardSchema } from '../../entites/reward/reward.schema';
import { UpdateEventDto } from '../../dtos/event/update-event.dto';
import { UpdateRewardDto } from '../../dtos/reward/update-reward.dto';
import { Types } from 'mongoose';

@Injectable()
export class EventService {
	constructor(
		@InjectModel(Event.name) private eventModel: Model<EventSchema>,
		@InjectModel(Reward.name) private rewardModel: Model<RewardSchema>,
	) {}

	async findAllEvents(filter: { status?: string }) {
		return this.eventModel.find(filter).exec();
	}

	async findEventById(id: string) {
		return this.eventModel.findById(id).orFail(new Error('이벤트를 찾을 수 없습니다.'));
	}

	async getActiveEvents() {
		return this.eventModel.find({ status: 'active' }).exec();
	}

	async createEventWithReward(
		eventDto: CreateEventDto,
		rewardDto?: CreateRewardDto
	) {
		const session = await this.eventModel.db.startSession();
		session.startTransaction();

		try {
			const eventPayload = {
				...eventDto,
				eventType: eventDto.type,
				status: 'active'
			};

			const [savedEvent] = await this.eventModel.create([eventPayload], { session });

			let reward;
			if (rewardDto) {
				const rewardPayload = {
					...rewardDto,
					eventId: savedEvent._id,
					rewardType: 'auto',
				};
				[reward] = await this.rewardModel.create([rewardPayload], { session });
			}

			await session.commitTransaction();
			return { message: '이벤트가 생성되었습니다.', event: savedEvent, reward };
		} catch (error) {
			await session.abortTransaction();
			throw new Error(`Transaction failed: ${error.message}`);
		} finally {
			session.endSession();
		}
	}

	async updateEvent(
		id: string, 
		updateEventDto: UpdateEventDto, 
		updateRewardDto?: UpdateRewardDto
	) {

		const session = await this.eventModel.db.startSession();
		session.startTransaction();
		
		try {
			const updatedEvent = await this.eventModel.findByIdAndUpdate(
				id,
				{ $set: updateEventDto },
				{ new: true, session }
			).orFail(new Error('이벤트를 찾을 수 없습니다.'));

			let updatedReward: Reward | null = null;
			if (updateRewardDto) {
				const updatedReward = await this.rewardModel.updateMany(
					{ eventId: new Types.ObjectId(id) },
					{ $set: updateRewardDto },
					{ session }
				).exec();

				if (updatedReward.modifiedCount === 0) {
					throw new Error('업데이트할 보상 정보가 없습니다.');
				}
			}

			await session.commitTransaction();
			return { 
				message: '이벤트 정보가 수정되었습니다.', 
				event: updatedEvent, 
				reward: updatedReward 
			};
		} catch (error) {
			await session.abortTransaction();
			throw new Error(`Transaction failed: ${error.message}`);
		} finally {
			session.endSession();
		}
	}

	async deleteEvent(id: string) {
		const session = await this.eventModel.db.startSession();
		session.startTransaction();

		try {
			const deletedEvent = await this.eventModel
			.findByIdAndDelete(id, { session })
			.orFail(new Error('이벤트를 찾을 수 없습니다.'));
			
			await this.rewardModel
			.deleteMany({ eventId: new Types.ObjectId(id) }, { session });

			await session.commitTransaction();
			return { message: '이벤트가 삭제되었습니다.', event: deletedEvent };
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
		}
	}
}