import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Option, OptionDocument } from './schemas/option.schema';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Injectable()
export class OptionService {
  constructor(
    @InjectModel(Option.name)
    private optionModel: Model<OptionDocument>,
  ) {}

  async create(createOptionDto: CreateOptionDto): Promise<Option> {
    const createdOption = new this.optionModel(createOptionDto);
    return createdOption.save();
  }

  async findAll(): Promise<Option[]> {
    return this.optionModel.find();
  }

  async findOne(id: string): Promise<Option> {
    const option = await this.optionModel.findById(id);
    if (!option) throw new NotFoundException('Option not found');
    return option;
  }

  async update(id: string, updateOptionDto: UpdateOptionDto): Promise<Option> {
    const updated = await this.optionModel.findByIdAndUpdate(id, updateOptionDto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Option not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.optionModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Option not found');
  }
}
