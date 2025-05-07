// src/modules/order-detail/dto/create-order-detail.dto.ts
import { IsInt, IsMongoId, IsNotEmpty, Min } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNotEmpty({ message: 'Order ID is required' })
  @IsMongoId({ message: 'Invalid Order ID' })
  order: string;

  @IsNotEmpty({ message: 'Dish ID is required' })
  @IsMongoId({ message: 'Invalid Dish ID' })
  dish: string;

  @IsNotEmpty({ message: 'Quantity is required' })
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}