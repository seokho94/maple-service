import { Controller, Get, Post, Inject, Body, Req, Ip } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

@Controller('api/service/login')
export class SessionGatewayController {
	constructor(
		@Inject('SERVICE_USER') private readonly serviceUserClient: ClientProxy,
	) {}

	@Get('/test')
	async getTestCode() {
		return this.serviceUserClient.send('test_code', {});
	}

	@Post()
	login(@Req() req: Request, @Body() data: { userId: string; password: string }) {
		const ip = req.ip || req.connection?.remoteAddress;
		return this.serviceUserClient.send('login', { ip, userId: data.userId, password: data.password });
	}
}
