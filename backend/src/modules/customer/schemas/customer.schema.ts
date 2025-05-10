import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { IsOptional } from "class-validator";
import {HydratedDocument} from "mongoose";
export type CustomerDocument = HydratedDocument<Customer>;

@Schema({timestamps: true})
export class Customer {
    @IsOptional()
    @Prop({required: false, default: null})
    accountId: string;
    @IsOptional()
    @Prop({required: false, default: null})
    name: string;
    @IsOptional()
    @Prop({required: false, default: null})  
    phone: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);