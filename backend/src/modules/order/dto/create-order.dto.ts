import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  customerID: string;

  @IsMongoId()
  @IsNotEmpty()
  tableID: string;

  @IsNotEmpty()
  orderStatus: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: 'Total price must be greater than 0' })
  totalPrice: number;
}