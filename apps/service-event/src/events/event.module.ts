import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entites/event/event.schema';
import { Reward, RewardSchema } from './entites/reward/reward.schema';
import { LoginHistory, LoginHistorySchema } from './entites/login-history/login-history.schema';
import { EventController } from './controllers/event/event.controller';
import { EventService } from './services/event/event.service';
import { RewardController } from './controllers/reward/reward.controller';
import { RewardService } from './services/reward/reward.service';
import { RequestController } from './controllers/request/request.controller';
import { RequestService } from './services/request/request.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Event.name, schema: EventSchema },
			{ name: Reward.name, schema: RewardSchema },
			{ name: LoginHistory.name, schema: LoginHistorySchema },
		]),
	],
	controllers: [EventController, RewardController, RequestController],
	providers: [EventService, RewardService, RequestService],
})
export class EventModule {}