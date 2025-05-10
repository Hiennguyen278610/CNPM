import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDetailSchema } from '@/modules/order-detail/schemas/order-detail.schema';
// import { PaymentSchema } from '@/modules/payment/schemas/payment.schema'; // Uncomment when ready
import { CustomerSchema } from '@/modules/customer/schemas/customer.schema';
import { TableSchema } from '@/modules/table/schemas/table.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'OrderDetail', schema: OrderDetailSchema },
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Table', schema: TableSchema },
      // { name: 'Payment', schema: PaymentSchema }, // Uncomment when PaymentSchema is ready
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
