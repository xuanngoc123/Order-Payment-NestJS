import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { orderIdParam } from '../docs/order.swagger';
import {
  ExBadRequest,
  ExCheckStatus,
  ExForbidden,
  ExOrder,
  ExServerInternalError,
  ExUnauthorized,
} from '../docs/value.example';
import { CreateOrderDto, OrderDetailDto } from './orders.dto';
import { IOrder } from './orders.entity';
import { OrdersService } from './orders.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Order')
@Controller('orders')
@ApiBadRequestResponse({ description: 'Bad request', type: ExBadRequest })
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ExUnauthorized })
@ApiForbiddenResponse({ description: 'Forbidden', type: ExForbidden })
@ApiInternalServerErrorResponse({
  description: 'Server error',
  type: ExServerInternalError,
})
@ApiBearerAuth('Authorization')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  @ApiBody({
    description: 'array of product and quantity, id of product must be correct',
    type: CreateOrderDto,
  })
  @ApiCreatedResponse({ description: 'create success', type: ExOrder })
  createOrder(
    @Body() order: CreateOrderDto,
    @Req() req: Request,
  ): Promise<any> {
    return this.orderService.createOrder(order, req);
  }

  @Get(':_id')
  @ApiParam(orderIdParam)
  @ApiOkResponse({ description: 'Ok', type: ExOrder })
  getOrderDetail(
    @Param() orderId: OrderDetailDto,
    @Req() req: Request,
  ): Promise<IOrder> {
    return this.orderService.getOrderDetail(orderId, req);
  }

  @Get('status/:_id')
  @ApiParam(orderIdParam)
  @ApiOkResponse({ description: 'Ok', type: ExCheckStatus })
  checkStatus(@Param() orderId: OrderDetailDto, @Req() req: Request) {
    return this.orderService.checkStatus(orderId, req);
  }

  @Get()
  @ApiOkResponse({ description: 'Ok', type: [ExOrder] })
  getOrder(@Req() req: Request): Promise<IOrder[]> {
    return this.orderService.getOrder(req);
  }

  @Put(':_id')
  @ApiParam(orderIdParam)
  @ApiOkResponse({ description: 'Ok', type: ExOrder })
  cancelOrder(
    @Param() orderId: OrderDetailDto,
    @Req() req: Request,
  ): Promise<IOrder> {
    return this.orderService.cancelOrder(orderId, req);
  }
}
