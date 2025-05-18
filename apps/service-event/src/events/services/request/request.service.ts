import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventSchema } from '../../entites/event/event.schema';
import { LoginHistory, LoginHistorySchema } from '../../entites/login-history/login-history.schema';

@Injectable()
export class RequestService {
	constructor(
		@InjectModel(Event.name) private eventModel: Model<EventSchema>,
		@InjectModel(LoginHistory.name) private loginHistoryModel: Model<LoginHistorySchema>,
	) {}

	async requestReward(eventId: string, userId: string,)
	: Promise<{ isEligible: boolean; message: string }> {

		const event = await this.eventModel.findById(eventId);
		if (!event) throw new Error('Event not found');

		const pipeline = [
			{
				$match: {
					userId,
					loginAt: {
						$gte: event.startDate,
						$lte: event.endDate,
					},
				},
			},
			{
				$project: {
					dateOnly: {
						$dateToString: { format: '%Y-%m-%d', date: '$loginAt' },
					},
				},
			},
			{
				$group: {
					_id: '$dateOnly',
				},
			},
			{
				$count: 'uniqueDays',
			},
		];

		const result = await this.loginHistoryModel.aggregate(pipeline);
		const uniqueDays = result[0]?.uniqueDays || 0;

		const isEligible = uniqueDays >= event.condition;
		const message = isEligible
			? `${uniqueDays}일 출석 조건 충족, 보상 지급 완료되었습니다.`
			: `${uniqueDays}일 출석, ${event.condition}일 출석 조건 미달성`;

		return { isEligible, message };
	}
}