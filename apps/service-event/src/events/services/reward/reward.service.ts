import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardSchema } from '../../entites/reward/reward.schema';
import { CreateRewardDto } from '../../dtos/reward/create-reward.dto';
import { UpdateRewardDto } from '../../dtos/reward/update-reward.dto';
import { Types } from 'mongoose'

@Injectable()
export class RewardService {
	constructor(
		@InjectModel(Reward.name) private rewardModel: Model<RewardSchema>,
	) {}

	async findAllRewards() {
		return this.rewardModel.find();
	}

	async findRewardById(id: string) {
		return this.rewardModel.findById(id).orFail(new Error('보상 정보를 찾을 수 없습니다.'));
	}

	async findRewardsByEventId(eventId: string) {
		return this.rewardModel.find({ eventId: eventId }).orFail(new Error('보상 정보를 찾을 수 없습니다.'));
	}

	async createReward(reward: CreateRewardDto) {
		return await this.rewardModel.create(reward);
	}

	async createRewards(rewards: CreateRewardDto[]) {
		const session = await this.rewardModel.db.startSession();
		session.startTransaction()

		try {
			const results: RewardSchema[] = [];
			for (const reward of rewards) {
				const created = await this.rewardModel.create(reward)
				results.push(created as RewardSchema);
			}
			await session.commitTransaction();
			return results;
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
		}
	}

	async updateReward(id: string, updateDto: UpdateRewardDto) {
		return this.rewardModel.findByIdAndUpdate(
			id,
			{ $set: updateDto },
			{ new: true }
		).orFail(new Error('보상 정보를 찾을 수 없습니다.'));
	}

	async updateRewards(id: string, updateDto: UpdateRewardDto) {
		return this.rewardModel.findByIdAndUpdate(
			id,
			{ $set: updateDto },
			{ new: true }
		).orFail(new Error('보상 정보를 찾을 수 없습니다.'));
	}

	async bulkUpdateRewards(
		updates: { id: string; data: UpdateRewardDto }[]
	) {
		const session = await this.rewardModel.db.startSession();
		session.startTransaction();

		try {
			const results: RewardSchema[] = [];
			for (const update of updates) {
				const updated = await this.rewardModel.findByIdAndUpdate(
					update.id,
					{ $set: update.data },
					{ new: true, session }
				).orFail(new Error(`이벤트(${update.id})를 찾을 수 없습니다.`));
				results.push(updated as RewardSchema);
			}
			await session.commitTransaction();
			return results;
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
		}
	}

	async deleteReward(id: string) {
		return this.rewardModel
			.findByIdAndDelete(id)
			.orFail(new Error('보상 정보를 찾을 수 없습니다.'));
	}

	async deleteRewardsByEventId(eventId: string) {
		const session = await this.rewardModel.db.startSession();
		session.startTransaction();

		try {
			const deletedRewards = await this.rewardModel.deleteMany({ eventId: eventId }, { session });
			await session.commitTransaction();
			return deletedRewards;
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			session.endSession();
		}
	}
}