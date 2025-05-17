import { NestFactory } from '@nestjs/core';
import { ServiceUserModule } from './service-user.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ServiceUserModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(process.env.SERVICE_USER_PORT || '3001'),
    }
  });
  
  console.log(`Service User Port: ${process.env.SERVICE_USER_PORT}`);
  await app.listen();
}
bootstrap();
