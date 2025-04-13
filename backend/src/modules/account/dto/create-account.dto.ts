import {IsEmail, IsNotEmpty} from "class-validator";

export class CreateAccountDto {
    @IsNotEmpty({message: 'username not null'})
    username: string;

    @IsNotEmpty({message: 'password not null'})
    password: string;

    @IsNotEmpty({message: 'phone not null'})
    phone: string;

    @IsEmail({}, {message: 'email not valid'})
    @IsNotEmpty({message: 'email not null'})
    email: string;
}
