import { Test, TestingModule } from '@nestjs/testing';
import { LoginHistoryGatewayController } from './login-history-gateway.controller';

describe('RequestGatewayController', () => {
	let controller: LoginHistoryGatewayController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [LoginHistoryGatewayController],
		}).compile();

		controller = module.get<LoginHistoryGatewayController>(LoginHistoryGatewayController);
	});

	it('should be defined', () => {
		// expect(controller).toBeDefined();
	});
});
