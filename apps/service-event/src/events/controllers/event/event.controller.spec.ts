import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from '../../services/event/event.service';

describe('EventController', () => {
	let eventController: EventController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [EventController],
			providers: [EventService],
		}).compile();

		eventController = app.get<EventController>(EventController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			// expect(serviceEventController.getHello()).toBe('Hello World!');
		});
	});
});
