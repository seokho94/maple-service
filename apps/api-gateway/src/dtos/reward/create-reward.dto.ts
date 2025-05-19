import { IsEnum, IsNumber } from 'class-validator';

export class CreateRewardDto {
	@IsEnum(['meso', 'cache', 'coupon'])
	type: string;

	@IsNumber()
	amount: number;
}