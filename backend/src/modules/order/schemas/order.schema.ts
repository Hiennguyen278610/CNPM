// src/modules/order/schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import internal from 'stream';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerID: Types.ObjectId;

  @IsNotEmpty()
  @Prop({ type: Types.ObjectId, ref: 'Table', required: true })
  tableID: Types.ObjectId;
  @IsOptional()
  @IsNumber()
  @Prop({ default: '0' })
  orderStatus: number;

  @IsOptional()
  @IsNumber()
  @Prop({ default: 0 })
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);