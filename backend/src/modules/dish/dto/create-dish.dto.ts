// src/modules/dish/dto/create-dish.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDishDto {
  @IsString()
  @IsNotEmpty({ message: 'dishName không được để trống' })
  dishName: string;

  @IsNumber({}, { message: 'dishPrice phải là số' })
  dishPrice: number;

  @IsString()
  @IsOptional()
  dishImg?: string;

  @IsString()
  @IsOptional()
  dishType?: string;
}
