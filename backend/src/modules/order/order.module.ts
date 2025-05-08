import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDetailSchema } from '@/modules/order-detail/schemas/order-detail.schema';
// import { PaymentSchema } from '@/modules/payment/schemas/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'OrderDetail', schema: OrderDetailSchema },
      // { name: 'Payment', schema: PaymentSchema }, //chua co 
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
