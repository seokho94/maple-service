import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { GetRewardHistoryDto } from '../../dtos/request/get-reward-history.dto';
import { RolesGuard } from '../../guard/role.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../decorators/roles/roles.enum';


@Controller('api/service/requests')
@UseGuards(AuthGuard, RolesGuard)
export class RequestGatewayController {
	constructor(
		@Inject('SERVICE_EVENT') private readonly eventClient: ClientProxy,
	) {}


	@Post('histories')
	@Roles(Role.ADMIN, Role.OPERATOR, Role.USER)
	async getRewardRequestHistory( @Body() payload: GetRewardHistoryDto) {
		return this.eventClient.send('get_request_history', payload);
	}

	@Post('histories/all')
	@Roles(Role.OPERATOR, Role.AUDITOR, Role.ADMIN)
	async getRewardRequestAllHistory(@Body() payload: GetRewardHistoryDto) {
		return this.eventClient.send('get_request_all_history', payload);
	}

	@Post('reward')
	@Roles(Role.USER, Role.ADMIN, Role.OPERATOR)
	async requestReward(@Body() payload: { eventId: string; userId: string }) {
		const param = {
			eventId: payload.eventId,
			userId: payload.userId,
		}
		return this.eventClient.send('reward_request', payload);
	}
}