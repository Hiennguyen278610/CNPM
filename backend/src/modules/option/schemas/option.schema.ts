import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OptionDocument = Option & Document;

@Schema()
export class Option {
  @Prop({ required: true })
  optionName: string;

  @Prop({ required: true })
  optionPrice: number;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
