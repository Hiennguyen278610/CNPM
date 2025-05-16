import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Định nghĩa kiểu InventoryDocument
export type InventoryDocument = Inventory & Document;

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ type: Types.ObjectId, ref: 'Ingredient', required: true, index: true })
  ingredientID: Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  qty: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

// Đảm bảo tạo chỉ mục
InventorySchema.index({ ingredientID: 1 }, { unique: true });