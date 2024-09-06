import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './user.schema';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 먼저 ID가 이미 존재하는지 확인
    const existingUser = await this.userModel.findOne({ id: createUserDto.id }).exec();
    if (existingUser) {
      throw new ConflictException('ID already exists');
    }

    // 비밀번호를 해시화
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 새로운 유저를 생성
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    // 생성된 유저를 데이터베이스에 저장하고 반환
    return createdUser.save();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findOne({ id }).exec();
  }

  async validateUser(id: string, password: string): Promise<User | null> {
    const user = await this.findById(id);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}


