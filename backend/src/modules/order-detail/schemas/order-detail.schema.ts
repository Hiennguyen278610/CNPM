// src/modules/order-detail/schemas/order-detail.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema({ timestamps: true })
export class OrderDetail {
  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  order: Types.ObjectId;

  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: 'Dish', required: true })
  dish: Types.ObjectId;

  @IsNotEmpty()
  @Prop({ required: true })
  quantity: number;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);