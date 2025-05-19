import { Controller, Get, Post, Patch, Delete, Inject, Param, Body, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { RolesGuard } from '../../guard/role.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../decorators/roles/roles.enum';
import { NoAuth } from '../../decorators/no-auth.decorator';


@Controller('api/service/user')
@UseGuards(AuthGuard, RolesGuard)
export class UserGatewayController {
	constructor(
		@Inject('SERVICE_USER') private readonly serviceUserClient: ClientProxy,
	) {}

	@Get()
	@Roles(Role.ADMIN, Role.OPERATOR)
	async findAll() {
		return this.serviceUserClient.send('get_all_users', {});
	}

	@Get(':id')
	@Roles(Role.ADMIN, Role.OPERATOR)
	async findOne(@Param('id') id: string) {
		return this.serviceUserClient.send('get_user', { id });
	}

	@Post()
	@NoAuth()
	async createUser(@Body() createUserDto: CreateUserDto) {
		console.log('create_user', createUserDto);
		return this.serviceUserClient.send('create_user', createUserDto);
	}

	@Patch(':id')
	@Roles(Role.ADMIN, Role.OPERATOR, Role.USER)
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return this.serviceUserClient.send('update_user', {id, updateUserDto });
	}

	@Delete(':id')
	@Roles(Role.ADMIN, Role.OPERATOR, Role.USER)
	async remove(
		@Param('id') id: string,
	) {
		return this.serviceUserClient.send('remove_user', { id });
	}
}