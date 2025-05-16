import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Định nghĩa kiểu RecipeDocument
export type RecipeDocument = Recipe & Document;

@Schema({ timestamps: true })
export class Recipe {
  @Prop({ type: Types.ObjectId, ref: 'Dish', required: true, index: true })
  dishID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Ingredient', required: true, index: true })
  ingredientID: Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  amountRequired: number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

// Đảm bảo tạo chỉ mục
RecipeSchema.index({ dishID: 1, ingredientID: 1 }, { unique: true });