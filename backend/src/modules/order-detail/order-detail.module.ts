// src/modules/order-detail/order-detail.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetail, OrderDetailSchema } from './schemas/order-detail.schema';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { Dish, DishSchema } from '@/modules/dish/schemas/dish.schema';
import { Order, OrderSchema } from '../order/schemas/order.schema';
import { OrderService } from '../order/order.service';
import { OrderModule } from '../order/order.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderDetail.name, schema: OrderDetailSchema },
      { name: Dish.name, schema: DishSchema },
      { name: Order.name, schema: OrderSchema}
    ]),
    OrderModule, 
  ],
  controllers: [OrderDetailController],
  providers: [OrderDetailService, OrderService],
})
export class OrderDetailModule {}