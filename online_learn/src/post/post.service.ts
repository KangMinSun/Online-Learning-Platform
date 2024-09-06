import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './post.schema';
import { CreatePostDto } from './post.dto';
import { Lecture } from '../lecture/lecture.schema';
import { User } from '../user/user.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private postModel: Model<Post>,
    @InjectModel('Lecture') private lectureModel: Model<Lecture>,
  ) {}

  async createPost(createPostDto: CreatePostDto, professorId: Types.ObjectId): Promise<Post> {
    const lecture = await this.lectureModel.findById(createPostDto.lectureId).exec();
    
    if (!lecture) {
      throw new NotFoundException('Lecture not found.');
    }

    if (lecture.professor.toString() !== professorId.toString()) {
      throw new UnauthorizedException('You can only create posts for your own lectures.');
    }

    const createdPost = new this.postModel({
      title: createPostDto.title,
      content: createPostDto.content,
      lecture: lecture._id,
      professor: professorId,
    });

    return createdPost.save();
  }

  // 교수용: 특정 강의의 게시물 조회
  async findPostsForProfessor(professorId: Types.ObjectId, lectureId: string): Promise<Post[]> {
    const lecture = await this.lectureModel.findById(lectureId).exec();

    if (!lecture) {
      throw new NotFoundException('Lecture not found.');
    }

    // 해당 강의를 담당하는 교수인지 확인
    if (lecture.professor.toString() !== professorId.toString()) {
      throw new UnauthorizedException('You are not authorized to view posts for this lecture.');
    }

    return this.postModel.find({ lecture: lectureId }).exec();
  }

  // 학생용: 특정 강의의 게시물 조회
  async findPostsForStudent(studentId: Types.ObjectId, lectureId: string): Promise<Post[]> {
    const lecture = await this.lectureModel.findById(lectureId).exec();

    if (!lecture) {
      throw new NotFoundException('Lecture not found.');
    }

    // 학생 수강 여부 확인
    if (!lecture.students.includes(studentId)) {
      throw new UnauthorizedException('You are not enrolled in this lecture.');
    }

    return this.postModel.find({ lecture: lectureId }).exec();
  }
}
