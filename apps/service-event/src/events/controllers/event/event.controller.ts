import { Controller, Get } from '@nestjs/common';
import { EventService } from '../../services/event/event.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateEventDto } from '../../dtos/event/create-event.dto';
import { CreateRewardDto } from '../../dtos/reward/create-reward.dto';
import { UpdateEventDto } from '../../dtos/event/update-event.dto';
import { UpdateRewardDto } from '../../dtos/reward/update-reward.dto';

@Controller()
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@MessagePattern('create_event')
	async handleEventCreation(@Payload() payload: {
		eventData: CreateEventDto;
		rewardData?: CreateRewardDto;
	}) {
		try {
		const result = await this.eventService.createEventWithReward(
			payload.eventData,
			payload.rewardData
		);
		return { success: true, data: result };
		} catch (error) {
		return { 
			success: false, 
			error: error.message,
			timestamp: new Date().toISOString()
		};
		}
	}

	@MessagePattern('get_events')
	async handleGetEvents(@Payload() payload: { status?: string }) {
		return this.eventService.findAllEvents(payload);
	}

	@MessagePattern('get_event_by_id')
	async handleGetEventById(@Payload() id: string) {
		return this.eventService.findEventById(id);
	}

	@MessagePattern('update_event')
	async handleUpdateEvent(@Payload() payload: { 
		id: string; 
		updateEventDto: UpdateEventDto
		updateRewardDto?: UpdateRewardDto;
	}) {
		return this.eventService.updateEvent(
			payload.id, payload.updateEventDto, payload.updateRewardDto
		);
	}

	@MessagePattern('delete_event')
	async handleDeleteEvent(@Payload() id: string) {
		return this.eventService.deleteEvent(id);
	}
}
