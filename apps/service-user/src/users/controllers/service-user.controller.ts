import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller()
export class ServiceUserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_users')
  async getUsers() {
    return this.userService.getUser();
  }

  @MessagePattern('create_user')
  async createUser(createUserDto: CreateUserDto) {
    console.log(`create_user: ${JSON.stringify(createUserDto)}`);
    return this.userService.create(createUserDto);
  }
}
