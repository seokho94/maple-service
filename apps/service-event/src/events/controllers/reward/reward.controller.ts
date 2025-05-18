import { Controller, Get } from '@nestjs/common';
import { RewardService } from '../../services/reward/reward.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateRewardDto } from '../../dtos/reward/update-reward.dto';

@Controller()
export class RewardController {
	constructor(private readonly rewardService: RewardService) {}

	@MessagePattern('get_event_reward')
	async handleGetRewards(@Payload() eventId: string) {
		return this.rewardService.findRewardById(eventId);
	}

	@MessagePattern('update_reward')
	async handleUpdateReward(@Payload() payload: { id: string; data: UpdateRewardDto }) {
		return this.rewardService.updateReward(payload.id, payload.data);
	}

	@MessagePattern('delete_reward')
	async handleDeleteReward(@Payload() id: string) {
		return this.rewardService.deleteReward(id);
	}
}
