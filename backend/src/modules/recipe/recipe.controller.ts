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
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Public } from '@/decorator/customize';
@Public()
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  async findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.recipeService.remove(id);
  }
}