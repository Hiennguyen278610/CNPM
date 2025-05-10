import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
export type CustomerDocument = HydratedDocument<Customer>;

@Schema({timestamps: true})
export class Customer {
    @Prop({required: true})
    customerId: string;
    @Prop({required: false})
    accountId: string;
    @Prop({required: false})
    name: string;
    @Prop({required: false})  
    phone: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);