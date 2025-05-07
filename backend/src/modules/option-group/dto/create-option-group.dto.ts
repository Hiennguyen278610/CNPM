import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOptionGroupDto {
    @IsNotEmpty()
    @IsNumber()
    dishID : number

    @IsNotEmpty()
    @IsNumber()
    optionID : number

    @IsNotEmpty()
    @IsString()
    optionGroupName : string
}
