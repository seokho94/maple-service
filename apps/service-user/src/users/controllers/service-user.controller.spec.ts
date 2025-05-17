import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUserController } from './service-user.controller';
import { UserService } from '../services/user.service';

describe('ServiceUserController', () => {
  let serviceUserController: ServiceUserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceUserController],
      providers: [UserService],
    }).compile();

    serviceUserController = app.get<ServiceUserController>(ServiceUserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(serviceUserController.getHello()).toBe('Hello World!');
    });
  });
});
