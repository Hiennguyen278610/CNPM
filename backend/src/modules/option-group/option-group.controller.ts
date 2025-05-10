import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptionGroupService } from './option-group.service';
import { CreateOptionGroupDto } from './dto/create-option-group.dto';
import { UpdateOptionGroupDto } from './dto/update-option-group.dto';
import { Public } from '@/decorator/customize';

@Public()
@Controller('option-group')
export class OptionGroupController {
  constructor(private readonly optionGroupService: OptionGroupService) {}

  @Post()
  create(@Body() createOptionGroupDto: CreateOptionGroupDto) {
    return this.optionGroupService.create(createOptionGroupDto);
  }

  @Get()
  findAll() {
    return this.optionGroupService.findAll();
  }

  @Get('dish/:dishId')
  findByDishId(@Param('dishId') dishId: string) {
    return this.optionGroupService.findByDishId(dishId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionGroupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionGroupDto: UpdateOptionGroupDto) {
    return this.optionGroupService.update(id, updateOptionGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionGroupService.remove(id);
  }
}
