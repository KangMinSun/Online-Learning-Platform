import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './user.dto';
import { JwtAuthGuard } from '../auth/JWTauth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 200, description: '회원가입 성공' })
  @ApiResponse({ status: 401, description: '회원가입 실패' })
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.role === 'student' && !createUserDto.studentId) {
      throw new Error('Student ID is required for students');
    }
    if (createUserDto.role === 'professor') {
      delete createUserDto.studentId; // 교수인 경우 학번 제거
    }
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: '내정보 요청 - 이름, 학번, 교수/학생 여부' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOkResponse({ type: UserDto })
  async getProfile(@Req() req: Request): Promise<UserDto> {
    const user = req.user as any;
    console.log(req.user);
    return {
      name: user.name,
      studentId: user.role === 'student' ? user.studentId : null,
      role: user.role,
    };
  }
}

