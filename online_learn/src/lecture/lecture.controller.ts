import { Controller, Post, Body, Get, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto, EnrollLectureDto } from './lecture.dto';
import { User } from '../user/user.schema';
import { JwtAuthGuard } from '../auth/JWTauth.guard';
import { Types } from 'mongoose';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiOkResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('lecture')
@Controller('lectures')
@UseGuards(JwtAuthGuard)
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @ApiOperation({ summary: '교수 - 새로운 강의 등록' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateLectureDto })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', description: '제목' },
        description: { type: 'string', description: '내용' },
    },
    required: ['title', 'description'],
    },
  })
  @Post()
  async createLecture(@Body() createLectureDto: CreateLectureDto, @Request() req: any) {
    const user = req.user;  // req.user는 JWT 전략에 의해 설정된 현재 사용자 정보

    if (user.role !== 'professor') {
      throw new UnauthorizedException('Only professors can create lectures.');
    }

    return this.lectureService.createLecture(createLectureDto, user._id);
  }

  @ApiOperation({ summary: '교수 - 자신의 강의 목록 조회' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiBearerAuth()
  @Get()
  async getLectures(@Request() req: any) {
    const user = req.user;

    if (user.role !== 'professor') {
      throw new UnauthorizedException('Only professors can view their lectures.');
    }

    return this.lectureService.findLecturesByProfessor(user._id);
  }

   // 학생용 기능 추가

  @ApiOperation({ summary: '학생 - 모든 강의 목록 조회' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiBearerAuth()
  @Get('all')
  async getAllLectures() {
    return this.lectureService.findAllLectures();
  }

  @ApiOperation({ summary: '학생 - 강의 수강 신청' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: EnrollLectureDto })
  @ApiBody({
    schema: {
      properties: {
        lectureId: { type: 'string'},
    },
    required: ['lectureId'],
    },
  })
  @Post('enroll')
  async enrollInLecture(@Body() enrollLectureDto: EnrollLectureDto, @Request() req: any) {
    const user = req.user;

    if (user.role !== 'student') {
      throw new UnauthorizedException('Only students can enroll in lectures.');
    }

    return this.lectureService.enrollInLecture(enrollLectureDto, user._id);
  }

  @ApiOperation({ summary: '학생 - 수강 신청한 강의 목록 조회' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiBearerAuth()
  @Get('student')
  async getStudentLectures(@Request() req: any) {
    const user = req.user;

    if (user.role !== 'student') {
      throw new UnauthorizedException('Only students can view their enrolled lectures.');
    }

    return this.lectureService.findLecturesByStudent(user._id);
  }
}
