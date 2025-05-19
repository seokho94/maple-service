import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { CreateRewardDto } from '../../dtos/reward/create-reward.dto';
import { UpdateRewardDto } from '../../dtos/reward/update-reward.dto';

@Controller('api/service/rewards')
export class RewardGatewayController {
	constructor(
		@Inject('SERVICE_EVENT') private readonly eventClient: ClientProxy,
	) {}

	@Get()
	async getRewards() {
		return this.eventClient.send('get_rewards', {});
	}

	@Get('/event/:eventId')
	async getRewardsByEventId(@Param('eventId') eventId: string) {
		return this.eventClient.send('get_rewards_by_evnet_id', eventId);
	}

	// id: rewardId
	@Get(':id')
	async getReward(@Param('id') id: string) {
		return this.eventClient.send('get_reward_by_id', id);
	}

	@UseGuards(AuthGuard)
	@Post()
	async createReward(
		@Body() payload: { reward: CreateRewardDto; }
	) {
		return this.eventClient.send('create_reward', {
			data: payload.reward
		});
	}

	@UseGuards(AuthGuard)
	@Post('/bulk')
	async createRewards(
		@Body() payload: { rewards: CreateRewardDto[]; }
	) {
		return this.eventClient.send('create_rewards', {
			rewards: payload.rewards
		});
	}

	@UseGuards(AuthGuard)
	// id: rewardId
	@Patch('/bulk')
	async updateRewards(
		@Body() payload: { updates: { id: string, data: UpdateRewardDto; }[] }
	) {
		return this.eventClient.send('update_reward', {
			updates: payload.updates
		});
	}
	
	@UseGuards(AuthGuard)
	// id: rewardId
	@Patch(':id')
	async updateReward(
		@Param('id') id: string,
		@Body() payload: { reward: UpdateRewardDto; }
	) {
		return this.eventClient.send('update_reward', {
			id, 
			data: payload.reward
		});
	}

	@UseGuards(AuthGuard)
	@Delete('/bulk')
	async deleteRewards(@Body() payload: { eventId: string; }) {
		console.log('deleteRewards', payload.eventId);
		return this.eventClient.send('delete_rewards', payload.eventId);
	}

	@UseGuards(AuthGuard)
	// id: rewardId
	@Delete(':id')
	async deleteEvent(@Param('id') id: string) {
		return this.eventClient.send('delete_reward', id);
	}
}