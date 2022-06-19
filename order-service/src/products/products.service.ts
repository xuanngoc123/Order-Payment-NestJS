import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './products.dto';
import { IProduct } from './products.entity';
import { ProductRepository } from './products.repository';
@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}
  async addProduct(product: CreateProductDto): Promise<IProduct> {
    const findProduct = await this.productRepository.findOneByName(
      product.name,
    );
    if (findProduct) {
      throw new ConflictException();
    }
    return this.productRepository.create(product);
  }
}
