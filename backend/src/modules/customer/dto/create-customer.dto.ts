import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateCustomerDto {
    customerId: string;
    accountId: string;
    name: string;
    phone: string;
}