import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entites/event/event.schema';
import { Reward, RewardSchema } from './entites/reward/reward.schema';
import { EventController } from './controllers/event/event.controller';
import { EventService } from './services/event/event.service';
import { RewardController } from './controllers/reward/reward.controller';
import { RewardService } from './services/reward/reward.service';
import { RequestController } from './controllers/request/request.controller';
import { AttendanceRewardService } from './services/request/event/attendance-request.service';
import { RewardRequestInfo, RewardRequestInfoSchema } from './entites/request/reward-request-history.schema';
import { CommonRequestService } from './services/request/common-request.service';
import { RequestEventFactory } from './services/request/factory/event-factory.factory';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';


@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [`.${process.env.NODE_ENV}.env`],
		}),
		MongooseModule.forFeature([
			{ name: Event.name, schema: EventSchema },
			{ name: Reward.name, schema: RewardSchema },
			{ name: RewardRequestInfo.name, schema: RewardRequestInfoSchema },
		]),
		HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
	],
	controllers: [EventController, RewardController, RequestController],
	providers: [
		EventService, 
		RewardService, 
		RequestEventFactory, 
		CommonRequestService, 
		AttendanceRewardService,
		{
      provide: 'GATEWAY_URL',
      useValue: process.env.GATEWAY_URL || 'http://localhost:3000'
    }
	],
})
export class EventModule {}