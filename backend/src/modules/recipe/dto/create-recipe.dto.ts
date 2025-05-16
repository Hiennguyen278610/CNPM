import { IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsMongoId()
  dishID: string;

  @IsNotEmpty()
  @IsMongoId()
  ingredientID: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  amountRequired: number;
}