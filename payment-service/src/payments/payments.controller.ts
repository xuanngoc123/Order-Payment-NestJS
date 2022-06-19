import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ExBadRequest,
  ExForbidden,
  ExPayment,
  ExServerInternalError,
  ExUnauthorized,
} from '../docs/value.example';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderDto } from './payments.dto';
import { IPayment } from './payments.entity';
import { PaymentsService } from './payments.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @ApiTags('Payment')
  @ApiCreatedResponse({
    description: 'create payment success',
    type: ExPayment,
  })
  @ApiBadRequestResponse({ description: 'Bad request', type: ExBadRequest })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: ExUnauthorized,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: ExForbidden })
  @ApiInternalServerErrorResponse({
    description: 'Server error',
    type: ExServerInternalError,
  })
  @Post()
  async createPayment(@Body() orderDto: OrderDto): Promise<IPayment> {
    return await this.paymentService.createPayment(orderDto.orderDetail);
  }
}
