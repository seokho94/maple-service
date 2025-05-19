import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { CreateRewardDto } from '../../dtos/reward/create-reward.dto';
import { UpdateRewardDto } from '../../dtos/reward/update-reward.dto';
import { RolesGuard } from '../../guard/role.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../decorators/roles/roles.enum';

@Controller('api/service/rewards')
@UseGuards(AuthGuard, RolesGuard)
export class RewardGatewayController {
	constructor(
		@Inject('SERVICE_EVENT') private readonly eventClient: ClientProxy,
	) {}

	@Get()
	@Roles(Role.ADMIN, Role.OPERATOR)
	async getRewards() {
		return this.eventClient.send('get_rewards', {});
	}

	@Get('/event/:eventId')
	@Roles(Role.ADMIN, Role.OPERATOR, Role.USER)
	async getRewardsByEventId(@Param('eventId') eventId: string) {
		return this.eventClient.send('get_rewards_by_evnet_id', eventId);
	}

	// id: rewardId
	@Get(':id')
	@Roles(Role.ADMIN, Role.OPERATOR)
	async getReward(@Param('id') id: string) {
		return this.eventClient.send('get_reward_by_id', id);
	}

	@Post()
	@Roles(Role.ADMIN, Role.OPERATOR)
	async createReward(
		@Body() payload: { reward: CreateRewardDto; }
	) {
		return this.eventClient.send('create_reward', {
			data: payload.reward
		});
	}

	@Post('/bulk')
	@Roles(Role.ADMIN, Role.OPERATOR)
	async createRewards(
		@Body() payload: { rewards: CreateRewardDto[]; }
	) {
		return this.eventClient.send('create_rewards', {
			rewards: payload.rewards
		});
	}

	// id: rewardId
	@Patch('/bulk')
	@Roles(Role.ADMIN, Role.OPERATOR)
	async updateRewards(
		@Body() payload: { updates: { id: string, data: UpdateRewardDto; }[] }
	) {
		return this.eventClient.send('update_reward', {
			updates: payload.updates
		});
	}
	
	// id: rewardId
	@Patch(':id')
	@Roles(Role.ADMIN, Role.OPERATOR)
	async updateReward(
		@Param('id') id: string,
		@Body() payload: { reward: UpdateRewardDto; }
	) {
		return this.eventClient.send('update_reward', {
			id, 
			data: payload.reward
		});
	}

	@Delete('/bulk')
	@Roles(Role.ADMIN, Role.OPERATOR)
	async deleteRewards(@Body() payload: { eventId: string; }) {
		console.log('deleteRewards', payload.eventId);
		return this.eventClient.send('delete_rewards', payload.eventId);
	}

	// id: rewardId
	@Delete(':id')
	@Roles(Role.ADMIN, Role.OPERATOR)
	async deleteEvent(@Param('id') id: string) {
		return this.eventClient.send('delete_reward', id);
	}
}