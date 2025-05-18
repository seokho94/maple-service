import { Test, TestingModule } from '@nestjs/testing';
import { ServiceSessionController } from './service-session.controller';

describe('ServiceSessionController', () => {
	let serviceSessionController: ServiceSessionController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [ServiceSessionController],
			providers: [],
		}).compile();

		serviceSessionController = app.get<ServiceSessionController>(ServiceSessionController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			// expect(serviceUserController.getHello()).toBe('Hello World!');
		});
	});
});
