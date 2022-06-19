import mongoose from 'mongoose';

export interface IProduct {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
