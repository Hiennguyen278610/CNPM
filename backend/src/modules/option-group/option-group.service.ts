import { Injectable } from '@nestjs/common';
import { CreateOptionGroupDto } from './dto/create-option-group.dto';
import { UpdateOptionGroupDto } from './dto/update-option-group.dto';

@Injectable()
export class OptionGroupService {
  create(createOptionGroupDto: CreateOptionGroupDto) {
    return 'This action adds a new optionGroup';
  }

  findAll() {
    return `This action returns all optionGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optionGroup`;
  }

  update(id: number, updateOptionGroupDto: UpdateOptionGroupDto) {
    return `This action updates a #${id} optionGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} optionGroup`;
  }
}
