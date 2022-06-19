import mongoose from 'mongoose';
import { ExCheckStatus, ExOrder } from '../docs/value.example';
import { STATUS_ORDER_ENUM } from './orders.constant';
import { CreateOrderDto, OrderDetailDto } from './orders.dto';

export const mockedCreateOrder: CreateOrderDto = {
  orderDetail: [
    {
      productId: 1 as unknown as mongoose.Schema.Types.ObjectId,
      quantity: 2,
    },
  ],
};

export const mockedExOrder: ExOrder = {
  _id: 1 as unknown as mongoose.Schema.Types.ObjectId,
  status: STATUS_ORDER_ENUM.CREATED,
  user: 1 as unknown as mongoose.Schema.Types.ObjectId,
  orderDetail: [
    {
      productId: 1 as unknown as mongoose.Schema.Types.ObjectId,
      quantity: 2,
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockedOrderDetail: OrderDetailDto = {
  _id: 1 as unknown as mongoose.Types.ObjectId,
};

export const mockedExStatusOrder: ExCheckStatus = {
  _id: 1 as unknown as string,
  status: STATUS_ORDER_ENUM.CREATED,
};
