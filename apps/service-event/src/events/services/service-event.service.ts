import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceEventService {
  getHello(): string {
    return 'Hello World!';
  }
}
