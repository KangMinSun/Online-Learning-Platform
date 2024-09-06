import { Schema, Types, Document } from 'mongoose';

export const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  studentId: { type: String, required: false },
  role: { type: String, required: true, enum: ['professor', 'student'] },
  createdAt: { type: Date, default: Date.now },
});

export interface User extends Document {
  id: string;
  password: string;
  name: string;
  studentId: string;
  role: string;
}
