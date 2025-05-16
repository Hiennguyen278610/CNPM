import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateIngredientDto {
  @IsNotEmpty()
  @IsString()
  ingredientName: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['ml', 'g', 'kg', 'pcs'], { message: 'Đơn vị phải là ml, g, kg hoặc pcs' })
  unit: string;
}