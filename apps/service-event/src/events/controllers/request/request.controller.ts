import { Controller} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommonRequestService, PaginatedResponse, 
	RewardRequestHistoryResponse } from '../../services/request/common-request.service';
import { GetRewardHistoryDto } from '../../dtos/request/get-reward-history.dto';

@Controller()
export class RequestController {
	constructor(private readonly requestService: CommonRequestService) {}

	@MessagePattern('get_request_history')
	async getRewardRequestHistory(
		@Payload() data: GetRewardHistoryDto
	): Promise<PaginatedResponse<RewardRequestHistoryResponse>> {
		return this.requestService.getRewardRequestHistory(data);
	}

	@MessagePattern('get_request_all_history')
	async getRewardRequestAllHistory(
		@Payload() data: GetRewardHistoryDto
	): Promise<PaginatedResponse<RewardRequestHistoryResponse>> {
		return this.requestService.getRewardRequestHistory(data);
	}

	@MessagePattern('reward_request')
	async requestReward(@Payload() data: { eventId: string, userId: string }) {
		return this.requestService.processRewardRequest(data.eventId, data.userId);
	}
}
