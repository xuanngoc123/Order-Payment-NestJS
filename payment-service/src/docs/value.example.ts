import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import mongoose from 'mongoose';
import { STATUS_PAYMENT_ENUM } from '../payments/payments.constant';
import { STATUS } from '../commons/status.code';

export class ExPayment {
  @ApiProperty({ enum: STATUS_PAYMENT_ENUM })
  status: string;
  @ApiProperty()
  totalPrice: number;
  @ApiProperty({ type: String })
  orderId: mongoose.Schema.Types.ObjectId;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
export class ExProduct {
  @ApiProperty({ type: String })
  productId: mongoose.Schema.Types.ObjectId;
  @ApiProperty({ default: 1 })
  quantity: number;
}
export class ExOrder {
  @ApiProperty({ type: String })
  _id: mongoose.Schema.Types.ObjectId;
  @ApiProperty()
  status: string;
  @ApiProperty({ type: String })
  user: mongoose.Schema.Types.ObjectId;
  @ApiProperty({ type: ExProduct })
  @ValidateNested({ each: true })
  @Type(() => ExProduct)
  orderDetail: [ExProduct];
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class ExBadRequest {
  @ApiProperty({ default: STATUS.BAD_REQUEST })
  statusCode: number;
  @ApiProperty({ default: 'Bad request' })
  message: string;
}

export class ExUnauthorized {
  @ApiProperty({ default: STATUS.UNAUTHORIZED })
  statusCode: number;
  @ApiProperty({ default: 'Unauthorized' })
  message: string;
}
export class ExForbidden {
  @ApiProperty({ default: STATUS.FORBIDDEN })
  statusCode: number;
  @ApiProperty({ default: 'Forbidden' })
  message: string;
}
export class ExServerInternalError {
  @ApiProperty({ default: STATUS.SERVER_INTERNAL_ERROR })
  statusCode: number;
  @ApiProperty({ default: 'Server internal error' })
  message: string;
}
export class ExCheckStatus {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  status: string;
}
