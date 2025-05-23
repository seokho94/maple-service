import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SessionService } from '../services/session.service';

@Controller()
export class ServiceSessionController {
	constructor(private readonly sessionService: SessionService) {}

	@MessagePattern('login')
	async login(@Payload() data: { ip: string, userId: string; password: string }) {
		const user = await this.sessionService.validateUser(data.userId, data.password);
		if (!user) return { error: 'Invalid credentials' };
		return this.sessionService.login(user, data.ip);
	}

	@MessagePattern('get_login_history')
	async getLoginHistory(@Payload() data: { userId: string; startDate: Date; endDate: Date; }) {
		return this.sessionService.getLoginDays(data.userId, data.startDate, data.endDate);
	}
}
