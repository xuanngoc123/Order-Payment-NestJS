import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../users/users.schema';
import { STATUS_ORDER_ENUM } from './orders.constant';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ enum: STATUS_ORDER_ENUM, default: STATUS_ORDER_ENUM.CREATED })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  orderDetail: [
    {
      productId: mongoose.Schema.Types.ObjectId;
      quantity: number;
    },
  ];
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
