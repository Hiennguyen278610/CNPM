import { IsNotEmpty } from 'class-validator';

export class CreateTableDto {
  @IsNotEmpty({ message: 'name not null' })
  tableName: string;
}
