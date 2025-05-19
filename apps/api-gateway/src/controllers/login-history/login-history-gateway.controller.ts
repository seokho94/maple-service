import { Controller, Post, Body } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller('api/service/history')
export class LoginHistoryGatewayController {
	constructor(
		@Inject('SERVICE_USER') private readonly serviceUserClient: ClientProxy,
	) {}

	@Post()
	async getLoginHistory(@Body() payload: {
		userId: string;
		startData: Date;
		endDate: Date;
	}) {
		return this.serviceUserClient.send('get_login_history', payload);
	}
}