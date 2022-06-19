import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './products.dto';
import { IProduct } from './products.entity';
import { Product, ProductDocument } from './products.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async findOneByName(name: string): Promise<IProduct> {
    return this.productModel.findOne({ name: name });
  }
  create(product: CreateProductDto): Promise<IProduct> {
    return this.productModel.create(product);
  }
  async findOneById(id: any): Promise<IProduct> {
    return this.productModel.findOne({ _id: id });
  }
}
