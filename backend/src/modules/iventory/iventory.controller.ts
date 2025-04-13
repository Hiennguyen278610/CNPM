import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IventoryService } from './iventory.service';
import { CreateIventoryDto } from './dto/create-iventory.dto';
import { UpdateIventoryDto } from './dto/update-iventory.dto';

@Controller('iventory')
export class IventoryController {
  constructor(private readonly iventoryService: IventoryService) {}

  @Post()
  create(@Body() createIventoryDto: CreateIventoryDto) {
    return this.iventoryService.create(createIventoryDto);
  }

  @Get()
  findAll() {
    return this.iventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iventoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIventoryDto: UpdateIventoryDto) {
    return this.iventoryService.update(+id, updateIventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iventoryService.remove(+id);
  }
}
