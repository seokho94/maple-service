import { Test, TestingModule } from '@nestjs/testing';
import { RequestController } from './request.controller';
import { RequestService } from '../../services/request/request.service';

describe('ServiceEventController', () => {
	let requestController: RequestController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [RequestController],
			providers: [RequestService],
		}).compile();

		requestController = app.get<RequestController>(RequestController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			// expect(serviceEventController.getHello()).toBe('Hello World!');
		});
	});
});
