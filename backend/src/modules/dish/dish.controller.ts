// src/modules/dish/dish.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { Public } from '@/decorator/customize';
@Public() // vuot key jwt
@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishService.create(createDishDto);
  }

  @Get()
  findAll() {
    return this.dishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDishDto: CreateDishDto) {
    return this.dishService.update(id, updateDishDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dishService.delete(id);
  }
}
