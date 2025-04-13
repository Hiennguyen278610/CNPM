import { PartialType } from '@nestjs/mapped-types';
import { CreateIventoryDto } from './create-iventory.dto';

export class UpdateIventoryDto extends PartialType(CreateIventoryDto) {}
