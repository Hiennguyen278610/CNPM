import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IngredientService } from './ingredients.service';
import { Public } from '@/decorator/customize';
@Public()
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }

  @Get()
  async findAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.ingredientService.remove(id);
  }
}