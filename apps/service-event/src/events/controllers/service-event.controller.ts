import { Controller, Get } from '@nestjs/common';
import { ServiceEventService } from '../services/service-event.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ServiceEventController {
  constructor(private readonly serviceEventService: ServiceEventService) {}

  @MessagePattern('get_events')
  async getEvents() {
    return this.serviceEventService.getHello();
  }
}
