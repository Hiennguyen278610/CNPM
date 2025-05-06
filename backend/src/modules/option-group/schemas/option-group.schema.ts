import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export type OptionGroupDocument = OptionGroup & Document

@Schema()
export class OptionGroup {
    @IsNotEmpty()
    @IsNumber()
    @Prop({required: true})
    dishID: number;

    @IsNotEmpty()
    @IsNumber()
    @Prop({required: true})
    optionID: number;

    @IsNotEmpty()
    @IsString()
    @Prop({required: true})
    optionGroupName: string;    
}

export const OptionGroupSchema = SchemaFactory.createForClass(OptionGroup);

