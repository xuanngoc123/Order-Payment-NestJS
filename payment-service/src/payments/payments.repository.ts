import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/products.schema';
import { IPayment } from './payments.entity';
import { Payment, PaymentDocument } from './payments.schema';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(
    orderId: mongoose.Schema.Types.ObjectId,
    totalPrice: number,
    status: string,
  ): Promise<any | IPayment> {
    return this.paymentModel.create({
      orderId,
      totalPrice,
      status,
    });
  }

  async findProduct(id: mongoose.Schema.Types.ObjectId): Promise<any> {
    return this.productModel.findOne({ _id: id });
  }
}
