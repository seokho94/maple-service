import { Test, TestingModule } from '@nestjs/testing';
import { RewardController } from './reward.controller';
import { RewardService } from '../../services/reward/reward.service';

describe('ServiceEventController', () => {
	let rewardController: RewardController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [RewardController],
			providers: [RewardService],
		}).compile();

		rewardController = app.get<RewardController>(RewardController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			// expect(serviceEventController.getHello()).toBe('Hello World!');
		});
	});
});
