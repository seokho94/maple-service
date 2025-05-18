import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { ServiceSessionController } from "./controllers/service-session.controller";
import { SessionService } from "./services/session.service";
import { UserInfo, UserInfoSchema } from "../users/entities/userInfo.schema";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserInfo.name, schema: UserInfoSchema
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }, // Token expiration time
      }),
    }),
  ],
	controllers: [ServiceSessionController],
	providers: [SessionService],
})
export class SessionModule {}