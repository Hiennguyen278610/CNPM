import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-iventory.dto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {}