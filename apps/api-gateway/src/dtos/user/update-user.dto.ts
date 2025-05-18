import { IsOptional, IsString, IsEmail, IsMobilePhone, MinLength } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@MinLength(3)
	userName?: string;

	@IsOptional()
	@IsString()
	@MinLength(6)
	password?: string;

	@IsOptional()
	@IsString()
	nickName?: string;
	
	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	@IsMobilePhone('ko-KR')
	phoneNumber?: string;

	@IsOptional()
	@IsString()
	role?: string;
}