import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, Min, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class CreateOrderDetailDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  productId: mongoose.Schema.Types.ObjectId;
  @ApiProperty({ type: Number, default: 1 })
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}
export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({ type: [CreateOrderDetailDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  orderDetail: [CreateOrderDetailDto];
}

export class OrderDetailDto {
  @ApiProperty()
  @IsNotEmpty()
  _id: mongoose.Types.ObjectId;
}

export class GetStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  _id: mongoose.Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  user: mongoose.Schema.Types.ObjectId;
}
export class OrderDto {
  @ApiProperty()
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;
}
