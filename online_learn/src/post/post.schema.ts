import { Schema, Types, Document } from 'mongoose';

export const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // 서식이 있는 텍스트는 HTML로 저장될 수 있습니다.
  lecture: { type: Types.ObjectId, ref: 'Lecture', required: true },
  professor: { type: Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface Post extends Document {
  title: string;
  content: string;
  lecture: Types.ObjectId;
  professor: Types.ObjectId;
}
