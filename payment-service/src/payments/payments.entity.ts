import mongoose from 'mongoose';

export interface IPayment {
  _id: mongoose.Schema.Types.ObjectId;
  status: string;
  orderId: mongoose.Schema.Types.ObjectId;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
