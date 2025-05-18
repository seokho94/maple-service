import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserInfo, UserInfoSchema } from '../../users/entities/userInfo.schema';


@Injectable()
export class SessionService {
  constructor(
    @InjectModel(UserInfo.name) private userModel: Model<UserInfoSchema>,
    private jwtService: JwtService,
  ) {}

  async testCode() {
    return 'test_code';
  }

  async validateUser(userId: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ userId }).exec();
    if (user && (await user.comparePassword(pass))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      userId: user.userId, 
      sub: user._id,
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}