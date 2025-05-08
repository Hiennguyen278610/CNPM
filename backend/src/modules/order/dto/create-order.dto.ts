// src/modules/order/dto/create-order.dto.ts
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  orderStatus?: number;
  @IsOptional()
  totalPrice?: number;
}