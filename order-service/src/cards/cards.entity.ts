import mongoose from 'mongoose';

export interface Cards {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  amount: number;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
