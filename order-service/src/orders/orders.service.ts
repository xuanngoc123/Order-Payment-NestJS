import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import mongoose from 'mongoose';
import axiosPayment from '../axios/config';
import { STATUS_PAYMENT_ENUM } from '../commons/payment.status';
import { STATUS } from '../commons/status.code';
import { STATUS_ORDER_ENUM } from './orders.constant';
import { CreateOrderDto, OrderDetailDto } from './orders.dto';
import { IOrder } from './orders.entity';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private orderRepositoty: OrderRepository) {}

  // CREATE ORDER
  async createOrder(order: CreateOrderDto, req: Request): Promise<any> {
    try {
      const createOrder = await this.orderRepositoty.createOrder(
        req.user['id'],
        order,
      );

      setTimeout(async () => {
        const result: AxiosResponse = await axiosPayment.post(
          `/payments`,
          {
            orderDetail: createOrder,
          },
          {
            headers: {
              authorization: req.headers.authorization,
            },
          },
        );
        if (result.status !== STATUS.CREATED) {
          throw result;
        }

        if (result.data.status === STATUS_PAYMENT_ENUM.CONFIRMED) {
          createOrder.status = STATUS_ORDER_ENUM.COMFIRMED;
          await createOrder.save();

          setTimeout(async () => {
            await this.orderRepositoty.findOneAndUpdate(
              new mongoose.Types.ObjectId(createOrder['_id'].toString()),
              req.user['id'],
              STATUS_ORDER_ENUM.DELIVERED,
            );
          }, 15000);
        }

        if (result.data.status === STATUS_PAYMENT_ENUM.DECLINED) {
          createOrder.status = STATUS_ORDER_ENUM.CANCELED;
          await createOrder.save();
        }
      }, 15000);

      return createOrder;
    } catch (error) {
      console.log(error.response);

      if (error.response) {
        throw new HttpException(
          error.response.statusText,
          error.response.status,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  // ORDERDETAIL
  async getOrderDetail(orderId: OrderDetailDto, req: Request): Promise<IOrder> {
    const findOrder: IOrder = await this.orderRepositoty.findOne(
      orderId,
      req.user['id'],
    );

    if (!findOrder) {
      throw new NotFoundException();
    }
    return findOrder;
  }

  // LISTORDER
  getOrder(req: Request): Promise<IOrder[]> {
    return this.orderRepositoty.getOrder(req.user['id']);
  }

  async cancelOrder(orderId: OrderDetailDto, req: Request): Promise<IOrder> {
    const orderAfterUpdate = await this.orderRepositoty.findOneAndUpdate(
      orderId._id,
      req.user['id'],
      STATUS_ORDER_ENUM.CANCELED,
    );
    if (!orderAfterUpdate) {
      throw new NotFoundException();
    }
    return orderAfterUpdate;
  }

  async checkStatus(orderId: OrderDetailDto, req: Request) {
    const status = await this.orderRepositoty.getStatus({
      ...orderId,
      user: req.user['id'],
    });
    if (!status) {
      throw new NotFoundException();
    }
    return status;
  }
}
