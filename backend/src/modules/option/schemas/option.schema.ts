// option.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OptionDocument = Option & Document;

@Schema()
export class Option {
  @Prop()
  label: string;

  @Prop()
  price: number;
}

export const OptionSchema = SchemaFactory.createForClass(Option);

// Convert _id to id for frontend
OptionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});
