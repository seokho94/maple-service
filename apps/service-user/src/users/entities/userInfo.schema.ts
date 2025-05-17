import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserInfoSchema = HydratedDocument<UserInfo>;

@Schema({ 
  collection: 'user_infos',
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})
export class UserInfo {
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
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);