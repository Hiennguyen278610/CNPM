// src/modules/order/schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: 'Clerk', required: true })
  clerk: Types.ObjectId;

  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customer: Types.ObjectId;

  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: 'Table', required: true })
  table: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderDetail' }], default: [] })
  orderDetail: Types.ObjectId[];

  @Prop({ default: 'PENDING' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Payment' })
  payment: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);