import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ROLE_ENUM } from 'src/users/users.constant';
import { CreateProductDto } from './products.dto';
import { IProduct } from './products.entity';
import { ProductsService } from './products.service';
@UseGuards(JwtAuthGuard)
@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private productSevice: ProductsService) {}

  @Post()
  addProduct(
    @Body() product: CreateProductDto,
    @Req() req: Request,
  ): Promise<IProduct> {
    if (req.user['role'] !== ROLE_ENUM.ADMIN) {
      throw new ForbiddenException();
    }
    return this.productSevice.addProduct(product);
  }
}
