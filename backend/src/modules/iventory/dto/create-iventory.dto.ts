import { IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsMongoId()
  ingredientID: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  qty: number;
}