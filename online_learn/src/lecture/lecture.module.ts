import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { LectureSchema } from './lecture.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lecture', schema: LectureSchema }]),
    UserModule,
  ],
  controllers: [LectureController],
  providers: [LectureService],
  exports: [LectureService, MongooseModule],
})
export class LectureModule {}
