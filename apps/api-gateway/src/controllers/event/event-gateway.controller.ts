import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../decorators/roles/roles.enum';
import { RolesGuard } from '../../guard/role.guard';
import { CreateEventDto } from '../../dtos/event/create-event.dto';
import { CreateRewardDto } from '../../dtos/reward/create-reward.dto';
import { UpdateEventDto } from '../../dtos/event/update-event.dto';
import { UpdateRewardDto } from '../../dtos/reward/update-reward.dto';
import { NoAuth } from '../../decorators/no-auth.decorator';

@Controller('api/service/events')
@UseGuards(AuthGuard, RolesGuard)
export class EventGatewayController {
	constructor(
		@Inject('SERVICE_EVENT') private readonly eventClient: ClientProxy,
	) {}

	@Post()
	@Roles(Role.ADMIN, Role.OPERATOR)
	async createEvent(@Body() payload: {
		event: CreateEventDto;
		reward?: CreateRewardDto;
	}) {
		return this.eventClient.send('create_event', {
			eventData: payload.event,
			rewardData: payload.reward
		});
	}

	@Get()
	@NoAuth()
	async getEvents() {
		return this.eventClient.send('get_events', {});
	}

	@Get(':id')
	@NoAuth()
	async getEvent(@Param('id') id: string) {
		return this.eventClient.send('get_event_by_id', id);
	}

	@Patch(':id')
	@Roles(Role.ADMIN, Role.OPERATOR)
	async updateEvent(
		@Param('id') id: string,
		@Body() payload: { event: UpdateEventDto; reward?: UpdateRewardDto; }
	) {
		return this.eventClient.send('update_event', {
			id, 
			updateEventDto: payload.event,
			updateRewardDto: payload.reward
		});
	}

	@Delete(':id')
	@Roles(Role.ADMIN, Role.OPERATOR)
	async deleteEvent(@Param('id') id: string) {
		return this.eventClient.send('delete_event', id);
	}
}