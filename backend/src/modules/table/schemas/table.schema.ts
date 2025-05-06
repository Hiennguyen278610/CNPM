import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";


export type TableDocument = HydratedDocument<Table>;
@Schema({timestamps: true})
export class Table {
    @Prop()
    tableName: string;
    @Prop()
    qrToken: string;
}
export const TableSchema = SchemaFactory.createForClass(Table);
