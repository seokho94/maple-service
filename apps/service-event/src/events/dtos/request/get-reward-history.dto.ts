import { IsString, IsNumber, IsOptional, IsBoolean } from "class-validator";

export class GetRewardHistoryDto {
	@IsString()
	userId: string;

	@IsNumber()
	@IsOptional()
	page: number;

	@IsNumber()
	@IsOptional()
	limit: number;

	@IsOptional()
	@IsString()
	eventId?: string;

	@IsOptional()
	@IsBoolean()
	isRewarded?: boolean;

	@IsOptional()
	@IsString()
	status?: string;
}