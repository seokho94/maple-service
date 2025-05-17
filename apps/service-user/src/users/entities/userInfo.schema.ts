import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserInfoSchema = HydratedDocument<UserInfo>;

@Schema({ collection: 'user_infos'})
export class UserInfo {
  @Prop({ required: true, default: () => uuidv4() })
  userUUId: string;

  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  nickName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

	@Prop({ required: true })
	role: string;

  @Prop({ default: new Date() })
  createTime: Date;

}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);