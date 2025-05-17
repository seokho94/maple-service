import { NestFactory } from '@nestjs/core';
import { ServiceEventModule } from './service-event.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ServiceEventModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(process.env.SERVICE_EVENT_PORT || '3002'),
    }
  });
  console.log(`Service Event Port: ${process.env.SERVICE_EVENT_PORT}`);
  await app.listen();
}
bootstrap();
