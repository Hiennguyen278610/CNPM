import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {IsNotEmpty} from "class-validator";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({timestamps: true})
export class Customer {
    @Prop()
    accountId: string;
    @Prop()
    name: string;
    @Prop()
    phone: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);