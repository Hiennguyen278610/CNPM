import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOptionDto {
  @IsNotEmpty()
  @IsString()
  optionName: string;

  @IsNotEmpty()
  @IsNumber()
  optionPrice: number;
}
