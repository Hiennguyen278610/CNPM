// src/modules/order/dto/create-order.dto.ts
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'Clerk ID is required' })
  @IsMongoId({ message: 'Invalid Clerk ID' })
  clerk: string;

  @IsNotEmpty({ message: 'Customer ID is required' })
  @IsMongoId({ message: 'Invalid Customer ID' })
  customer: string;

  @IsNotEmpty({ message: 'Table ID is required' })
  @IsMongoId({ message: 'Invalid Table ID' })
  table: string;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  status?: string;

  @IsOptional()
  @IsMongoId({ message: 'Invalid Payment ID' })
  payment?: string;
}