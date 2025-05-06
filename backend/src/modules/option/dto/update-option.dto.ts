import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionDto } from './create-option.dto';
import {  IsString, IsNotEmpty, IsNumber } from 'class-validator';


export class UpdateOptionDto extends PartialType(CreateOptionDto) {
    @IsNotEmpty()
    @IsString()
    optionName: string;

    @IsNotEmpty()
    @IsNumber()
    optionPrice: number
}
