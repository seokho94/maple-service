import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './events/event.module';


@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [`.${process.env.NODE_ENV}.env`],
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>('MONGO_EVENT_URI'),
				replicaSet: 'rs0',
			}),
			inject: [ConfigService],
		}),
		EventModule,
	],
	controllers: [],
	providers: [],
})
export class ServiceEventModule {}
