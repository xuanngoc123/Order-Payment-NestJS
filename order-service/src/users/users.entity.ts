import mongoose from 'mongoose';

export interface IUsers {
  _id: mongoose.Schema.Types.ObjectId;
  userName: string;
  password: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
