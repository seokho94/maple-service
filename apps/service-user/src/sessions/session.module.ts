import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { ServiceSessionController } from "./controllers/service-session.controller";
import { SessionService } from "./services/session.service";
import { UserInfo, UserInfoSchema } from "../users/entities/userInfo.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserInfo.name, schema: UserInfoSchema
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
	controllers: [ServiceSessionController],
	providers: [SessionService],
})
export class SessionModule {}