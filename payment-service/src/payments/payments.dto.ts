import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class ProductDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  productId: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  quantity: number;
}

export class OrderDetailDto {
  _id: mongoose.Schema.Types.ObjectId;
  status: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  user: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: [ProductDto] })
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  orderDetail: ProductDto[];
}

export class OrderDto {
  @IsNotEmpty()
  @ApiProperty({ type: OrderDetailDto })
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDto)
  orderDetail: OrderDetailDto;
}
