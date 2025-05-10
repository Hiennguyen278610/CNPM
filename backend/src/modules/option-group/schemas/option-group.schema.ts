import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export type OptionGroupDocument = OptionGroup & Document;

@Schema()
export class OptionGroup {
    @IsNotEmpty()
    @IsMongoId()
    @Prop({ required: true })
    dishID: string;

    @IsNotEmpty()
    @IsMongoId({ each: true })
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Option' }])
    optionID: string[];

    @IsNotEmpty()
    @IsString()
    @Prop({ required: true })
    optionGroupName: string;
}

export const OptionGroupSchema = SchemaFactory.createForClass(OptionGroup);
