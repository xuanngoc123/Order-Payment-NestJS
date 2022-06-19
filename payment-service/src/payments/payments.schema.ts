import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Order } from '../schemas/orders.schema';
import { STATUS_PAYMENT_ENUM } from './payments.constant';
export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ enum: STATUS_PAYMENT_ENUM })
  status: string;

  @Prop()
  totalPrice: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  orderId: Order;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
