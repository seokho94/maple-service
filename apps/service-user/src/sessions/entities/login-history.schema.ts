import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type LoginHistorySchema = HydratedDocument<LoginHistory>;

@Schema({ collection: 'login_histories', autoCreate: true })
export class LoginHistory {
	@Prop({ required: true })
	userId: string;

	@Prop({ required: true })
	loginAt: Date;

	@Prop({ required: true })
	ip: string;
}

export const LoginHistorySchema = SchemaFactory.createForClass(LoginHistory);