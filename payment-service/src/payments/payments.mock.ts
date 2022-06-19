import mongoose from 'mongoose';
import { ExPayment } from '../docs/value.example';
import { STATUS_PAYMENT_ENUM } from './payments.constant';
import { OrderDetailDto } from './payments.dto';

export const mockedCreatePayment: OrderDetailDto = {
  _id: 1 as unknown as mongoose.Schema.Types.ObjectId,
  status: '',
  user: 1 as unknown as mongoose.Schema.Types.ObjectId,
  orderDetail: [
    {
      productId: 1 as unknown as mongoose.Schema.Types.ObjectId,
      quantity: 1,
    },
    {
      productId: 1 as unknown as mongoose.Schema.Types.ObjectId,
      quantity: 2,
    },
  ],
};
export const mockedExPayment: ExPayment = {
  status: STATUS_PAYMENT_ENUM.CONFIRMED,
  totalPrice: 1,
  orderId: 1 as unknown as mongoose.Schema.Types.ObjectId,
  createdAt: new Date(),
  updatedAt: new Date(),
};
