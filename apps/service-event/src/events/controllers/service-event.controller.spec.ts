import { Test, TestingModule } from '@nestjs/testing';
import { ServiceEventController } from './service-event.controller';
import { ServiceEventService } from '../services/service-event.service';

describe('ServiceEventController', () => {
  let serviceEventController: ServiceEventController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceEventController],
      providers: [ServiceEventService],
    }).compile();

    serviceEventController = app.get<ServiceEventController>(ServiceEventController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(serviceEventController.getHello()).toBe('Hello World!');
    });
  });
});
