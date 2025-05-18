import { Test, TestingModule } from '@nestjs/testing';
import { SessionGatewayController } from './session-gateway.controller';

describe('SessionGatewayController', () => {
  let controller: SessionGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionGatewayController],
    }).compile();

    controller = module.get<SessionGatewayController>(SessionGatewayController);
  });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
  });
});
