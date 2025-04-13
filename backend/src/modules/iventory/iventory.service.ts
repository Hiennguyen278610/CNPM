import { Injectable } from '@nestjs/common';
import { CreateIventoryDto } from './dto/create-iventory.dto';
import { UpdateIventoryDto } from './dto/update-iventory.dto';

@Injectable()
export class IventoryService {
  create(createIventoryDto: CreateIventoryDto) {
    return 'This action adds a new iventory';
  }

  findAll() {
    return `This action returns all iventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iventory`;
  }

  update(id: number, updateIventoryDto: UpdateIventoryDto) {
    return `This action updates a #${id} iventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} iventory`;
  }
}
