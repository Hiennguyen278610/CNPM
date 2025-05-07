import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

// // 👇 Import các schema cần populate
// import { ClerkSchema } from '@/modules/clerk/schemas/clerk.schema';
// import { CustomerSchema } from '@/modules/customer/schemas/customer.schema';
// import { TableSchema } from '@/modules/table/schemas/table.schema';
import { OrderDetailSchema } from '@/modules/order-detail/schemas/order-detail.schema';
// import { PaymentSchema } from '@/modules/payment/schemas/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      // { name: 'Clerk', schema: ClerkSchema },
      // { name: 'Customer', schema: CustomerSchema },
      // { name: 'Table', schema: TableSchema },
      { name: 'OrderDetail', schema: OrderDetailSchema },
      // { name: 'Payment', schema: PaymentSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
