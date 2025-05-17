import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServiceEventController } from './events/controllers/service-event.controller';
import { ServiceEventService } from './events/services/service-event.service';
import { MongooseModule } from '@nestjs/mongoose';



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
      }),
      inject: [ConfigService],
    })],
  controllers: [ServiceEventController],
  providers: [ServiceEventService],
})
export class ServiceEventModule {}
