import { Schema, Types, Document } from 'mongoose';

export const LectureSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  professor: { type: Types.ObjectId, ref: 'User', required: true },
  students: [{ type: Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export interface Lecture extends Document {
  title: string;
  description: string;
  professor: Types.ObjectId;
  students: Types.ObjectId[];
}
