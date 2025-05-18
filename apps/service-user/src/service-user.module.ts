import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { SessionModule } from './sessions/session.module';


@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [`.${process.env.NODE_ENV}.env`],
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>('MONGO_USER_URI'),
				replicaSet: 'rs0',
			}),
			inject: [ConfigService],
		}),
		UserModule,
		SessionModule
	],
	controllers: [],
	providers: [],
})
export class ServiceUserModule {}
