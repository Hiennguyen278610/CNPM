import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient, IngredientDocument } from './schemas/ingredient.schema';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    try {
      const createdIngredient = new this.ingredientModel(createIngredientDto);
      return await createdIngredient.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Nguyên liệu với tên này đã tồn tại');
      }
      throw new BadRequestException('Không thể tạo nguyên liệu');
    }
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientModel.find().exec();
  }

  async findOne(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientModel.findById(id).exec();
    if (!ingredient) {
      throw new NotFoundException(`Không tìm thấy nguyên liệu với ID ${id}`);
    }
    return ingredient;
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<Ingredient> {
    const updatedIngredient = await this.ingredientModel
      .findByIdAndUpdate(id, updateIngredientDto, { new: true })
      .exec();
    if (!updatedIngredient) {
      throw new NotFoundException(`Không tìm thấy nguyên liệu với ID ${id}`);
    }
    return updatedIngredient;
  }

  async remove(id: string): Promise<void> {
    const result = await this.ingredientModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Không tìm thấy nguyên liệu với ID ${id}`);
    }
  }
}