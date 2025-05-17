import { Module } from '@nestjs/common';
import { UserGatewayController } from './controllers/user/user-gateway.controller';
import { EventGatewayController } from './controllers/event/event-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.${process.env.NODE_ENV}.env`],
    }),
    ClientsModule.register([
      {
        name: 'SERVICE_USER',
        transport: Transport.TCP,
        options: {
          host: process.env.SERVICE_USER_HOST || 'localhost',
          port: parseInt(process.env.SERVICE_USER_PORT || '3001')
        }
      },
      {
        name: 'SERVICE_EVENT',
        transport: Transport.TCP,
        options: {
          host: process.env.SERVICE_USER_HOST || 'localhost',
          port: parseInt(process.env.SERVICE_EVNET_PORT || '3002'),
        }
      }
    ]),
  ],
  controllers: [UserGatewayController, EventGatewayController],
  providers: [],
})
export class ApiGatewayModule {}
