import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { OrderSchema } from './orders.schema';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProductsModule } from '../products/products.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({ removeListener: true }),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
