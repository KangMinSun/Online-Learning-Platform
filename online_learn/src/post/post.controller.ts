import { Controller, Post, Body, Get, Request, Param, UseGuards, UnauthorizedException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './post.dto';
import { User } from '../user/user.schema';
import { JwtAuthGuard } from '../auth/JWTauth.guard';
import { Types } from 'mongoose';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiOkResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('post')
@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: '교수 - 강의 게시물 작성' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreatePostDto })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', description: '제목' },
        content: { type: 'string', description: '내용' },
        lectureId: { type: 'string'},
    },
    required: ['title', 'description', 'lectureId'],
    },
  })
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req: any) {
    const user = req.user;

    if (user.role !== 'professor') {
      throw new UnauthorizedException('Only professors can create posts.');
    }

    return this.postService.createPost(createPostDto, user._id);
  }

  @ApiOperation({ summary: '특정 강의에 대한 게시물 조회 (교수-자신이 담당한 강의의 게시물 조회 / 학생-자신이 수강 신청한 강의의 게시물 조회)' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiBearerAuth()
  @Get('lecture/:lectureId')
  async getPosts(@Param('lectureId') lectureId: string, @Request() req: any) {
    const user = req.user;

    // 교수일 경우: 자신의 강의에 대한 게시물만 조회 가능
    if (user.role === 'professor') {
      return this.postService.findPostsForProfessor(user._id, lectureId);
    }

    // 학생일 경우: 자신이 수강신청한 강의에 대한 게시물만 조회 가능
    if (user.role === 'student') {
      return this.postService.findPostsForStudent(user._id, lectureId);
    }

    throw new UnauthorizedException('You are not authorized to view these posts.');
  }
}
