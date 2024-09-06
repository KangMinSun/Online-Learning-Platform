import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LectureModule } from './lecture/lecture.module';
import { PostModule } from './post/post.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/online-learn'),
    AuthModule,
    UserModule,
    LectureModule,
    PostModule,
  ],
})
export class AppModule {}

