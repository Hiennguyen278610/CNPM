// src/modules/dish/schemas/dish.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DishDocument = Dish & Document;

@Schema()
export class Dish {
  @Prop({ required: true })
  dishName: string;

  @Prop()
  dishPrice: number;

  @Prop()
  dishImg: string;
  @Prop()
  dishType: string;
}

export const DishSchema = SchemaFactory.createForClass(Dish);
