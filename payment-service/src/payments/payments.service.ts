import { Injectable } from '@nestjs/common';
import { STATUS_PAYMENT_ENUM } from './payments.constant';
import { OrderDetailDto } from './payments.dto';
import { IPayment } from './payments.entity';
import { PaymentRepository } from './payments.repository';

@Injectable()
export class PaymentsService {
  constructor(private paymentRepository: PaymentRepository) {}
  async createPayment(orderDto: OrderDetailDto): Promise<IPayment> {
    let total = 0;
    for (let i = 0; i < orderDto.orderDetail.length; i++) {
      const product = await this.paymentRepository.findProduct(
        orderDto.orderDetail[i].productId,
      );
      total = total + product.price * orderDto.orderDetail[i].quantity;
    }

    const random = Math.floor(Math.random() * 10) % 2;
    let status: string;
    if (random === 0) {
      status = STATUS_PAYMENT_ENUM.CONFIRMED;
    }
    if (random === 1) {
      status = STATUS_PAYMENT_ENUM.DECLINED;
    }

    return this.paymentRepository.create(orderDto._id, total, status);
  }
}
