import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { STATUS_ORDER_ENUM } from './orders.constant';

import { CreateOrderDto, GetStatusDto, OrderDetailDto } from './orders.dto';
import { IOrder } from './orders.entity';

import { Order, OrderDocument } from './orders.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  createOrder(userId, order: CreateOrderDto): Promise<any> {
    return this.orderModel.create({
      user: userId,
      orderDetail: order.orderDetail,
    });
  }

  async findOne(orderId: OrderDetailDto, userId: any): Promise<IOrder> {
    return this.orderModel.findOne({ ...orderId, user: userId });
  }

  async getOrder(userId: mongoose.Schema.Types.ObjectId): Promise<IOrder[]> {
    return this.orderModel.find({ user: userId });
  }

  async getStatus(getStatusDto: GetStatusDto) {
    return this.orderModel.findOne(getStatusDto, 'status');
  }

  async findOneAndUpdate(
    orderId: mongoose.Types.ObjectId,
    newStatus: string,
  ): Promise<IOrder> {
    return this.orderModel.findOneAndUpdate(
      { _id: orderId, status: STATUS_ORDER_ENUM.COMFIRMED },
      { status: newStatus },
    );
  }
}
