import {IsOptional } from "class-validator";

export class CreateCustomerDto {
    @IsOptional()
    accountId: string;
    @IsOptional()
    name: string;
    @IsOptional()
    phone: string;
}