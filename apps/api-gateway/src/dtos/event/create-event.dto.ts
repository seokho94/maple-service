import { IsEnum, IsDateString, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateEventDto {
	@IsString()
	title: string;

	@IsEnum(['attendance', 'quest', 'invite', 'etc'])
	type: string;

	@IsNumber()
	condition: number;

	@IsDateString()
	startDate: Date;

	@IsDateString()
	endDate: Date;

	@IsOptional()
	@IsEnum(['active', 'inactive'])
	status: string;
}