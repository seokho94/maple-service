import { MongooseModule } from "@nestjs/mongoose";
import { UserInfo, UserInfoSchema } from "./entities/userInfo.schema";
import { Module } from "@nestjs/common";
import { ServiceUserController } from "./controllers/service-user.controller";
import { UserService } from "./services/user.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: UserInfo.name, schema: UserInfoSchema
			},
		]),
	],
	controllers: [ServiceUserController],
	providers: [UserService],
})
export class UserModule {}