// src/modules/dish/dish.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dish, DishDocument } from './schemas/dish.schema';
import { CreateDishDto } from './dto/create-dish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
  ) {}

  async create(createDishDto: CreateDishDto): Promise<Dish> {
    const dish = new this.dishModel(createDishDto);
    return dish.save();
  }

  async findAll(): Promise<Dish[]> {
    return this.dishModel.find().exec();
  }

  async findById(id: string): Promise<Dish | null> {
    return this.dishModel.findById(id).exec();
  }

  async delete(id: string): Promise<any> {
    return this.dishModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, updateDishDto: Partial<CreateDishDto>): Promise<Dish | null> {
    return this.dishModel.findByIdAndUpdate(id, updateDishDto, { new: true }).exec();
  }
}
