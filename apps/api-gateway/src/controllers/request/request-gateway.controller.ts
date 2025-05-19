import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { GetRewardHistoryDto } from '../../dtos/request/get-reward-history.dto';


@Controller('api/service/requests')
@UseGuards(AuthGuard)
export class RequestGatewayController {
	constructor(
		@Inject('SERVICE_EVENT') private readonly eventClient: ClientProxy,
	) {}

	@Post('histories') 
	async getRewardRequestHistory( @Body() payload: GetRewardHistoryDto) {
		return this.eventClient.send('get_request_history', payload);
	}

	@Post('histories/all')
	async getRewardRequestAllHistory(@Body() payload: {
		userId?: string;
		eventId?: string;
		isRewarded?: boolean;
		status?: string;
		page?: number;
		limit?: number;
	}) {
		return this.eventClient.send('get_request_all_history', payload);
	}

	@Post('reward')
	async requestReward(@Body() payload: { eventId: string; userId: string }) {
		const param = {
			eventId: payload.eventId,
			userId: payload.userId,
		}
		return this.eventClient.send('reward_request', payload);
	}
}