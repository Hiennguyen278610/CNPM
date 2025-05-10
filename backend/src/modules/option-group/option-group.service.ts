import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OptionGroup, OptionGroupDocument } from './schemas/option-group.schema';
import { CreateOptionGroupDto } from './dto/create-option-group.dto';
import { UpdateOptionGroupDto } from './dto/update-option-group.dto';

@Injectable()
export class OptionGroupService {
  constructor(
    @InjectModel(OptionGroup.name)
    private optionGroupModel: Model<OptionGroupDocument>,
  ) {}

  async create(createOptionGroupDto: CreateOptionGroupDto): Promise<OptionGroupDocument> {
    const createdOptionGroup = new this.optionGroupModel(createOptionGroupDto);
    return createdOptionGroup.save();
  }

  async findAll(): Promise<OptionGroupDocument[]> {
    return this.optionGroupModel.find().exec();
  }

  async findOne(id: string): Promise<OptionGroupDocument> {
    const optionGroup = await this.optionGroupModel.findById(id).exec();
    if (!optionGroup) throw new NotFoundException('OptionGroup not found');
    return optionGroup;
  }

  async findByDishId(dishId: string): Promise<OptionGroupDocument[]> {
    console.log('Finding options for dish:', dishId);
    const result = await this.optionGroupModel
      .find({ dishID: dishId })
      .populate({
        path: 'optionID',
        select: 'optionName optionPrice'
      })
      .lean()
      .exec();
    console.log('Found options:', JSON.stringify(result, null, 2));
    return result;
  }

  async update(id: string, updateOptionGroupDto: UpdateOptionGroupDto): Promise<OptionGroupDocument> {
    const updated = await this.optionGroupModel.findByIdAndUpdate(id, updateOptionGroupDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('OptionGroup not found');
    return updated;
  }

  async remove(id: string): Promise<OptionGroupDocument> {
    const deleted = await this.optionGroupModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('OptionGroup not found');
    return deleted;
  }
}
