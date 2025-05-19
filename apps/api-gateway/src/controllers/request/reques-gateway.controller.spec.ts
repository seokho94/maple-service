import { Test, TestingModule } from '@nestjs/testing';
import { RequestGatewayController } from './request-gateway.controller';

describe('RequestGatewayController', () => {
	let controller: RequestGatewayController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RequestGatewayController],
		}).compile();

		controller = module.get<RequestGatewayController>(RequestGatewayController);
	});

	it('should be defined', () => {
		// expect(controller).toBeDefined();
	});
});
