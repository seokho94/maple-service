import { Controller, Get, Post, Inject, Body, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


@Controller('api/service/login')
export class SessionGatewayController {
  constructor(
    @Inject('SERVICE_USER') private readonly serviceUserClient: ClientProxy,
  ) {}

  @Get('/test')
  async getTestCode() {
    return this.serviceUserClient.send('test_code', {});
  }

  @Post()
  login(@Body() data: { userId: string; password: string }) {
    return this.serviceUserClient.send('login', data);
  }
}