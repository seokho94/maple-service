import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardSchema } from '../../entites/reward/reward.schema';
import { UpdateRewardDto } from '../../dtos/reward/update-reward.dto';

@Injectable()
export class RewardService {
	constructor(
		@InjectModel(Reward.name) private rewardModel: Model<RewardSchema>,
	) {}

	async create(createRewardDto: any) {
		return this.rewardModel.create(createRewardDto);
	}

	async findRewardById(id: string) {
		return this.rewardModel.findById(id).orFail(new Error('보상 정보를 찾을 수 없습니다.'));
	}

	async updateReward(id: string, updateDto: UpdateRewardDto) {
		return this.rewardModel.findByIdAndUpdate(
			id,
			{ $set: updateDto },
			{ new: true }
		).orFail(new Error('보상 정보를 찾을 수 없습니다.'));
	}

	async deleteReward(id: string) {
		return this.rewardModel
			.findByIdAndDelete(id)
			.orFail(new Error('보상 정보를 찾을 수 없습니다.'));
	}
}