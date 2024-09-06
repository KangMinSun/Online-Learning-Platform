import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Lecture } from './lecture.schema';
import { CreateLectureDto, EnrollLectureDto } from './lecture.dto';
import { User } from '../user/user.schema';

@Injectable()
export class LectureService {
  constructor(
    @InjectModel('Lecture') private lectureModel: Model<Lecture>,
  ) {}

  async createLecture(createLectureDto: CreateLectureDto, professorId: Types.ObjectId): Promise<Lecture> {
    const createdLecture = new this.lectureModel({
      ...createLectureDto,
      professor: professorId,
    });

    return createdLecture.save();
  }

  async findLecturesByProfessor(professorId: Types.ObjectId): Promise<Lecture[]> {
    return this.lectureModel.find({ professor: professorId }).exec();
  }

// 학생용 기능 추가

  async findAllLectures(): Promise<Lecture[]> {
    return this.lectureModel.find().exec();  // 모든 강의 목록 조회
  }

  async enrollInLecture(enrollLectureDto: EnrollLectureDto, studentId: Types.ObjectId): Promise<Lecture> {
    const lecture = await this.lectureModel.findById(enrollLectureDto.lectureId).exec();
    
    if (!lecture) {
      throw new NotFoundException('Lecture not found.');
    }

    if (lecture.students.includes(studentId)) {
      throw new UnauthorizedException('You are already enrolled in this lecture.');
    }

    lecture.students.push(studentId);  // 학생을 수강신청한 학생 목록에 추가

    return lecture.save();
  }

  async findLecturesByStudent(studentId: Types.ObjectId): Promise<Lecture[]> {
    return this.lectureModel.find({ students: studentId }).exec();  // 학생이 수강신청한 강의 목록 조회
  }

}
