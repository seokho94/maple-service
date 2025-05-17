import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('api/service/event')
export class EventGatewayController {
  constructor(
    @Inject('SERVICE_EVENT') private readonly serviceEventClient: ClientProxy,
  ) {}

  @Get()
  async getEvent() {
    return this.serviceEventClient.send('get_events', {});
  }
}