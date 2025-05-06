import {IsMongoId, IsNotEmpty, IsEmail, IsOptional, IsString, IsBoolean} from 'class-validator';

export class UpdateAccountDto {
    @IsMongoId({message: 'ID không hợp lệ'})
    @IsNotEmpty({message: 'ID không được để trống'})
    _id: string;
    
    @IsString()
    @IsOptional()
    password: string;
    
    @IsString()
    @IsOptional()
    phone: string;
    
    @IsString()
    @IsOptional()
    accountType: string;
    
    @IsString()
    @IsOptional()
    role: string;
    
    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}
