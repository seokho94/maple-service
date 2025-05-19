import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventSchema = HydratedDocument<Event>;

@Schema({ collection: 'event_infos' })
export class Event {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true, index: true })
	eventType: string;

	@Prop({ required: true })
	condition: number;

	@Prop({ required: true, index: true })
	startDate: Date;

	@Prop({ required: true, index: true })
	endDate: Date;

	@Prop({ required: true, index: true, enum: ['active', 'inactive'] })
	status: string;

	@Prop({ required: true, enum: ['auto', 'manual'] })
	approvalType: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);