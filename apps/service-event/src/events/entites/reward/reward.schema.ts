import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type RewardSchema = HydratedDocument<Reward>;

@Schema({ collection: 'reward_infos' })
export class Reward {
	@Prop({ type: Types.ObjectId, ref: 'Event', required: true, index: true })
	eventId: Types.ObjectId;

	@Prop({ required: true })
	type: string;

	@Prop({ required: true })
	amount: number;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);