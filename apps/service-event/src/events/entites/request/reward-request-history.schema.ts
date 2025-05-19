import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RewardRequestInfoSchema = HydratedDocument<RewardRequestInfo>;

@Schema({ collection: 'reward_request_infos', autoCreate: true })
export class RewardRequestInfo {
	@Prop({ 
		type: String,
		required: true, 
		index: true
	})
	userId: string;

	@Prop({ 
		type: String, 
		required: true, 
		index: true
	})
	eventId: string;

	@Prop({ 
		type: Date, 
		required: true,
		index: true,
		default: Date.now 
	})
	requestedAt: Date;

	@Prop({ 
		type: Date, 
		default: null,
		index: true
	})
	rewardedAt: Date | null;

	@Prop({ 
		type: String, 
		enum: ['pending', 'processing', 'completed', 'failed'],
		default: 'pending' 
	})
	status: string;

	@Prop({ type: [String] })
	errorLog: string[];

	@Prop({ 
		type: Boolean, 
		required: true, 
		default: false, 
		index: true 
	})
	isRewarded: boolean;
}

export const RewardRequestInfoSchema = SchemaFactory.createForClass(RewardRequestInfo);