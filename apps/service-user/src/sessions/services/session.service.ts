import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserInfo, UserInfoSchema } from '../../users/entities/userInfo.schema';
import { LoginHistory, LoginHistorySchema } from '../entities/login-history.schema';


@Injectable()
export class SessionService {
	constructor(
		@InjectModel(UserInfo.name) private userModel: Model<UserInfoSchema>,
		private jwtService: JwtService,
		@InjectModel(LoginHistory.name) private readonly loginHistoryModel: Model<LoginHistorySchema>,
	) {}

	async validateUser(userId: string, pass: string): Promise<any> {
		const user = await this.userModel.findOne({ userId }).exec();
		if (user && (await user.comparePassword(pass))) {
			const { password, ...result } = user.toObject();
			return result;
		}
		return null;
	}

	async login(user: any, ip: string) {
		console.log('user', user);
		console.log('ip', ip);
		const payload = { 
			userId: user.userId, 
			sub: user._id,
			role: user.role 
		};

		const loginRecord = new this.loginHistoryModel({
			userId: user.userId,
			loginAt: new Date(),
			ip,
		});

		await loginRecord.save();

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async getLoginDays(userId: string, startDate: Date, endDate: Date): Promise<number> {

		const kstStartDate = new Date(startDate);
		kstStartDate.setHours(kstStartDate.getHours() + 9);
		
		const kstEndDate = new Date(endDate);
		kstEndDate.setHours(kstEndDate.getHours() + 9);

		const result = await this.loginHistoryModel.aggregate([
			{
				$match: {
					userId: userId,
					loginAt: { 
						$gte: kstStartDate,
						$lte: kstEndDate
					}
				}
			},
			{
				$project: {
					dateOnly: {
						$dateToString: {
							format: '%Y-%m-%d',
							date: '$loginAt',
							timezone: '+09:00'
						}
					}
				}
			},
			{ $group: { _id: '$dateOnly' } },
			{ 
				$group: { 
					_id: null, 
					uniqueLoginDays: { $sum: 1 } 
				} 
			}
		]);

		return result[0]?.uniqueLoginDays || 0;
	}
}