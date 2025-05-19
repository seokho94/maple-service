import { IsEnum, IsNumber } from 'class-validator';

export class CreateRewardDto {
	@IsEnum(['meso', 'cache', 'hair coupon'])
	type: string;

	@IsNumber()
	amount: number;
}