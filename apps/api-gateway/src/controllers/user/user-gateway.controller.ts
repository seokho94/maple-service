import { Controller, Get, Post, Inject, Body, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { Observable } from 'rxjs';


@Controller('api/service/user')
export class UserGatewayController {
  constructor(
    @Inject('SERVICE_USER') private readonly serviceUserClient: ClientProxy,
  ) {}

  @Get()
  async getUser() {
    return this.serviceUserClient.send('get_users', {});
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log('create_user', createUserDto);
    return this.serviceUserClient.send('create_user', createUserDto);
  }
}