import { IsNotEmpty, IsString, IsEmail, IsMobilePhone, IsDate, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  userId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  nickName: string;
  
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('ko-KR')
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsDate()
  createTime?: Date;
}