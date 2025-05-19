import { Controller, Get, Post, Patch, Delete, Inject, Param, Body, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { Observable } from 'rxjs';


@Controller('api/service/user')
export class UserGatewayController {
	constructor(
		@Inject('SERVICE_USER') private readonly serviceUserClient: ClientProxy,
	) {}

	@UseGuards(AuthGuard)
	@Get()
	async findAll() {
		return this.serviceUserClient.send('get_all_users', {});
	}

	@UseGuards(AuthGuard)
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.serviceUserClient.send('get_user', { id });
	}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto) {
		console.log('create_user', createUserDto);
		return this.serviceUserClient.send('create_user', createUserDto);
	}

	@UseGuards(AuthGuard)
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return this.serviceUserClient.send('update_user', {id, updateUserDto });
	}

	@UseGuards(AuthGuard)
	@Delete(':id')
	async remove(
		@Param('id') id: string,
	) {
		return this.serviceUserClient.send('remove_user', { id });
	}
}