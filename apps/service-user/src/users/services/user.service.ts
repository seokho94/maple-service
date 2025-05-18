import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserInfo, UserInfoSchema } from '../entities/userInfo.schema';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserInfo.name) private readonly userModel: Model<UserInfoSchema>,
	) {}

	testCode(): string {
		return 'Hello World!';
	}

	//전체 조회
	async findAll(): Promise<UserInfo[]> {
		return await this.userModel.find().exec();
	}

	//단일 조회
	async findOne(id: string): Promise<UserInfo> {
		const user = await this.userModel.findById(id).exec();
		if (!user) {
			throw new NotFoundException('사용자를 찾을 수 없습니다');
		}
		return user;
	}

	//생성
	async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
		try {
			const createUser = new this.userModel(createUserDto);
			await createUser.save();
			return { message: '사용자 생성 완료' };
		} catch (error) {
			if (error.code === 11000) {
				const key = Object.keys(error.keyPattern)[0];
				throw new ConflictException(`사용자가 이미 존재합니다`);
			}
			throw error;
		}
	}

	//사용자 정보 수정
	async update(id: string, updateUserDto: UpdateUserDto): Promise<{ message: string }> {
		try {
			const updatedUser = await this.userModel
				.findByIdAndUpdate(id, updateUserDto, { new: true })
				.exec();
			if (!updatedUser) throw new NotFoundException('사용자를 찾을 수 없습니다');
			return { message: '사용자 정보 수정 완료' };
		} catch (error) {
			if (error.code === 11000) {
				const key = Object.keys(error.keyPattern)[0];
				throw new ConflictException('변경할 수 없습니다.');
			}
			throw error;
		}
	}

	//사용자 삭제
	async remove(id: string): Promise<{ message: string }> {
		const result = await this.userModel.findByIdAndDelete(id).exec();
		if (!result) throw new NotFoundException('사용자를 찾을 수 없습니다');
		return { message: '사용자 삭제 완료' };
	}
}
