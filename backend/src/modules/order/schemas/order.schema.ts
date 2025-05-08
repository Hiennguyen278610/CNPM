// src/modules/order/schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import internal from 'stream';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {

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