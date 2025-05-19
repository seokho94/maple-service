import { Test, TestingModule } from '@nestjs/testing';
import { RequestController } from './request.controller';
import { AttendanceRewardService } from '../../services/request/event/attendance-request.service';

describe('ServiceEventController', () => {
	let requestController: RequestController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [RequestController],
			providers: [AttendanceRewardService],
		}).compile();

		requestController = app.get<RequestController>(RequestController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			// expect(serviceEventController.getHello()).toBe('Hello World!');
		});
	});
});
