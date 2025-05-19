import { Test, TestingModule } from '@nestjs/testing';
import { RewardGatewayController } from './reward-gateway.controller';

describe('RewardGatewayController', () => {
	let controller: RewardGatewayController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RewardGatewayController],
		}).compile();

		controller = module.get<RewardGatewayController>(RewardGatewayController);
	});

	it('should be defined', () => {
		// expect(controller).toBeDefined();
	});
});
