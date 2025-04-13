import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {IsNotEmpty} from "class-validator";

export type AccountDocument = HydratedDocument<Account>;

@Schema({timestamps: true})
export class Account {
    @IsNotEmpty()
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    phone: string;

    @Prop()
    email: string;

    @Prop({default: 'LOCAL'})
    accountType: string;

    @Prop({default: 'USER'})
    role: string;

    @Prop({default: false})
    isActive: boolean;

    @Prop()
    verifydcode: string;

    @Prop()
    verifyTime: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);