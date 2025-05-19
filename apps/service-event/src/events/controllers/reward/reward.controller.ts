import { Controller, Get } from '@nestjs/common';
import { RewardService } from '../../services/reward/reward.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateRewardDto } from '../../dtos/reward/update-reward.dto';
import { CreateRewardDto } from '../../dtos/reward/create-reward.dto';

@Controller()
export class RewardController {
	constructor(private readonly rewardService: RewardService) {}

	@MessagePattern('create_reward')
	async handleCreateReward(@Payload() payload: { data: CreateRewardDto }) {
		return this.rewardService.createReward(payload.data);
	}

	@MessagePattern('create_rewards')
	async handleCreateRewards(@Payload() payload: { rewards: CreateRewardDto[] }) {
		return this.rewardService.createRewards(payload.rewards);
	}

	@MessagePattern('get_rewards')
	async handleGetRewards() {
		return this.rewardService.findAllRewards();
	}

	@MessagePattern('get_reward_by_id')
	async handleGetRewardById(@Payload() id: string) {
		return this.rewardService.findRewardById(id);
	}

	@MessagePattern('get_rewards_by_evnet_id')
	async handleGetRewardsByEventId(@Payload() eventId: string) {
		return this.rewardService.findRewardsByEventId(eventId);
	}

	@MessagePattern('update_reward')
	async handleUpdateReward(@Payload() payload: { id: string; data: UpdateRewardDto }) {
		return this.rewardService.updateReward(payload.id, payload.data);
	}

	@MessagePattern('update_rewards')
	async handleUpdateRewards(@Payload() payload: { updates: { id: string; data: UpdateRewardDto }[] }) {
		return this.rewardService.bulkUpdateRewards(payload.updates)
	}

	@MessagePattern('delete_reward')
	async handleDeleteReward(@Payload() id: string) {
		return this.rewardService.deleteReward(id);
	}

	@MessagePattern('delete_rewards')
	async handleDeleteRewards(@Payload() eventId: string) {
		return this.rewardService.deleteRewardsByEventId(eventId);
	}
}
