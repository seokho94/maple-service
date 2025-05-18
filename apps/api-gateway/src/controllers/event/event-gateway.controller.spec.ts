import { Test, TestingModule } from '@nestjs/testing';
import { EventGatewayController } from './event-gateway.controller';

describe('EventGatewayController', () => {
	let controller: EventGatewayController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EventGatewayController],
		}).compile();

		controller = module.get<EventGatewayController>(EventGatewayController);
	});

	it('should be defined', () => {
		// expect(controller).toBeDefined();
	});
});
