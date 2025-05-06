import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty({message: 'accountId not null'})
    accountId: string;
    @IsNotEmpty({message: 'name not null'})
    name: string;
    @IsPhoneNumber('VN', { message: 'phone not valid' })
    @IsNotEmpty({message: 'phone not null'})
    phone: string;
}
