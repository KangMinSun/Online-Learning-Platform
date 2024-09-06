import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  studentId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(['student', 'professor'])
  role: string;
}

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  studentId: string; // 학생일 때만 학번을 가짐

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn(['student', 'professor'])
  role: string;
}