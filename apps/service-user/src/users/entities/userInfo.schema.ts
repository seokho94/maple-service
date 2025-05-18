import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserInfoSchema = HydratedDocument<UserInfo>;

@Schema({ 
	collection: 'user_infos',
	timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})
export class UserInfo {
	@Prop({ required: true, unique: true })
	userId: string;

	@Prop({ required: true })
	password: string;

	async comparePassword(attempt: string): Promise<boolean> {
		return bcrypt.compare(attempt, this.password);
	}

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

UserInfoSchema.methods.comparePassword = async function (
	attempt: string,
): Promise<boolean> {
	return bcrypt.compare(attempt, this.password);
};

UserInfoSchema.pre<UserInfoSchema>('save', async function (next) {
	if (!this.isModified('password')) return next();
	
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (err) {
		next(err);
	}
});