import {IsEmail, IsNotEmpty} from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({message: 'Tên đăng nhập không được để trống'})
    username: string;
    
    @IsEmail({}, {message: 'Email không đúng định dạng'})
    @IsNotEmpty({message: 'Email không được để trống'})
    email: string;

    @IsNotEmpty({message: 'Mật khẩu không được để trống'})
    password: string;

    @IsNotEmpty({message: 'Số điện thoại không được để trống'})
    phone: string;
}
