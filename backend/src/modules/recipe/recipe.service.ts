import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe, RecipeDocument } from './schemas/recipe.schema';
@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    try {
      const createdRecipe = new this.recipeModel(createRecipeDto);
      return await createdRecipe.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Công thức cho món ăn và nguyên liệu này đã tồn tại');
      }
      throw new BadRequestException('Không thể tạo công thức');
    }
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipeModel.find().populate('dishID ingredientID').exec();
  }

  async findOne(id: string): Promise<Recipe> {
    const recipe = await this.recipeModel
      .findById(id)
      .populate('dishID ingredientID')
      .exec();
    if (!recipe) {
      throw new NotFoundException(`Không tìm thấy công thức với ID ${id}`);
    }
    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const updatedRecipe = await this.recipeModel
      .findByIdAndUpdate(id, updateRecipeDto, { new: true })
      .populate('dishID ingredientID')
      .exec();
    if (!updatedRecipe) {
      throw new NotFoundException(`Không tìm thấy công thức với ID ${id}`);
    }
    return updatedRecipe;
  }

  async remove(id: string): Promise<void> {
    const result = await this.recipeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Không tìm thấy công thức với ID ${id}`);
    }
  }
}