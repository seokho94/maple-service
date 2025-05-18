import { Controller} from '@nestjs/common';
import { RequestService } from '../../services/request/request.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RequestController {
	constructor(private readonly requestService: RequestService) {}

	@MessagePattern('reward_request')
	async requestReward(@Payload() data: { eventId: string, userId: string}) {
		return this.requestService.requestReward(data.eventId, data.userId);
	}
}
