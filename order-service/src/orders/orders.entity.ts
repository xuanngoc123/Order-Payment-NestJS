import mongoose from 'mongoose';

export interface IOrder {
  _id: mongoose.Schema.Types.ObjectId;
  status: string;
  user: mongoose.Schema.Types.ObjectId;
  orderDetail: IProduct[];
  createdAt: Date;
  updatedAt: Date;
}

interface IProduct {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}
