import { IsMongoId, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateOptionGroupDto {
    @IsNotEmpty()
    @IsMongoId()
    dishID: string;

    @IsNotEmpty()
    @IsArray()
    @IsMongoId({ each: true })
    optionID: string[];

    @IsNotEmpty()
    @IsString()
    optionGroupName: string;
}
