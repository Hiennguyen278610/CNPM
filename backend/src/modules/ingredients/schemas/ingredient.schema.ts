import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Định nghĩa kiểu IngredientDocument
export type IngredientDocument = Ingredient & Document;

@Schema({ timestamps: true })
export class Ingredient {
  @Prop({ type: String, required: true, unique: true, trim: true })
  ingredientName: string;

  @Prop({ type: String, required: true, enum: ['ml', 'g', 'kg', 'pcs'] })
  unit: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);

// Đảm bảo tạo chỉ mục
IngredientSchema.index({ ingredientName: 1 }, { unique: true });