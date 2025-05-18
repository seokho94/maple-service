import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller()
export class ServiceUserController {
	constructor(private readonly userService: UserService) {}

	// 테스트 코드
	@MessagePattern('test_code')
	testCode() {
		return this.userService.testCode();
	}

	// 전체 사용자 조회
	@MessagePattern('get_all_users')
	async findAll() {
		return this.userService.findAll();
	}

	// 단일 사용자 조회
	@MessagePattern('get_user')
	async findOne(@Payload() data: { id: string }) {
		return this.userService.findOne(data.id);
	}

	// 사용자 생성
	@MessagePattern('create_user')
	async createUser(@Payload() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	// 사용자 정보 수정
	@MessagePattern('update_user')
	async update(@Payload() data: { id: string; updateUserDto: UpdateUserDto }) {
		return this.userService.update(data.id, data.updateUserDto);
	}

	// 사용자 삭제
	@MessagePattern('remove_user')
	async remove(@Payload() data: { id: string }) {
		return this.userService.remove(data.id);
	}
}
