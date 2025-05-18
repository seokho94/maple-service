import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SessionService } from '../services/session.service';



@Controller()
export class ServiceSessionController {
  constructor(private readonly sessionService: SessionService) {}

  // 테스트 코드
  @MessagePattern('test_code')
  testCode() {
    return this.sessionService.testCode();
  }

  @MessagePattern('login')
  async login(@Payload() data: { ip: string, userId: string; password: string }) {
    const user = await this.sessionService.validateUser(data.userId, data.password);
    if (!user) return { error: 'Invalid credentials' };
    return this.sessionService.login(user, data.ip);
  }
}
