import { Module } from '@nestjs/common';
import { UserGatewayController } from './controllers/user/user-gateway.controller';
import { SessionGatewayController } from './controllers/session/session-gateway.controller';
import { EventGatewayController } from './controllers/event/event-gateway.controller';
import { RewardGatewayController } from './controllers/reward/reward-gateway.controller';
import { RequestGatewayController } from './controllers/request/request-gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoginHistoryGatewayController } from './controllers/login-history/login-history-gateway.controller';

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
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
		}),
	],
	controllers: [
		UserGatewayController, 
		SessionGatewayController, 
		EventGatewayController, 
		RewardGatewayController, 
		RequestGatewayController,
		LoginHistoryGatewayController
	],
	providers: [],
})
export class ApiGatewayModule {}
