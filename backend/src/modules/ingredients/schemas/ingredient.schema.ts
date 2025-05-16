import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IngredientDocument = Ingredient & Document;

@Schema()
export class Ingredient {
  @Prop({ required: true })
  ingredientName: string;

  @Prop({ required: true, enum: ['ml', 'g', 'kg', 'pcs'] })
  unit: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);