import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserInfo, UserInfoSchema } from '../entities/userInfo.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserInfo.name) private readonly userModel: Model<UserInfoSchema>,
  ) {}

  async getUser(): Promise<string> {
    return 'Hello World!';
  }

  async create(createUserDto: CreateUserDto): Promise<UserInfo> {
    console.log(`create_user in user: ${JSON.stringify(createUserDto, null, 2)}`);
    const createUser = new this.userModel(createUserDto);
    console.log(`userModel in user: ${JSON.stringify(createUserDto, null, 2)}`);
    return await createUser.save();
  }
}
