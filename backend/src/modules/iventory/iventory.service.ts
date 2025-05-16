import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe, RecipeDocument } from '../recipe/schemas/recipe.schema';
import { CreateInventoryDto } from './dto/create-iventory.dto';
import { UpdateInventoryDto } from './dto/update-iventory.dto';
import { Inventory, InventoryDocument } from './schemas/iventory.schema';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<InventoryDocument>,
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    try {
      const createdInventory = new this.inventoryModel(createInventoryDto);
      return await createdInventory.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Tồn kho cho nguyên liệu này đã tồn tại');
      }
      throw new BadRequestException('Không thể tạo bản ghi tồn kho');
    }
  }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryModel.find().populate('ingredientID').exec();
  }

  async findOne(id: string): Promise<Inventory> {
    const inventory = await this.inventoryModel.findById(id).populate('ingredientID').exec();
    if (!inventory) {
      throw new NotFoundException(`Không tìm thấy bản ghi tồn kho với ID ${id}`);
    }
    return inventory;
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    const updatedInventory = await this.inventoryModel
      .findByIdAndUpdate(id, updateInventoryDto, { new: true })
      .populate('ingredientID')
      .exec();
    if (!updatedInventory) {
      throw new NotFoundException(`Không tìm thấy bản ghi tồn kho với ID ${id}`);
    }
    return updatedInventory;
  }

  async remove(id: string): Promise<void> {
    const result = await this.inventoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Không tìm thấy bản ghi tồn kho với ID ${id}`);
    }
  }

  async deductInventory(ingredientID: string, amount: number): Promise<void> {
    this.logger.log(`Deducting inventory: ingredientID=${ingredientID}, amount=${amount}`);
    const inventory = await this.inventoryModel.findOne({ ingredientID }).exec();
    if (!inventory) {
      throw new NotFoundException(`Không tìm thấy tồn kho cho nguyên liệu ${ingredientID}`);
    }
    if (inventory.qty < amount) {
      throw new BadRequestException(`Không đủ nguyên liệu trong kho. Cần ${amount}, hiện có ${inventory.qty}`);
    }
    inventory.qty -= amount;
    await inventory.save();
    this.logger.log(`Inventory updated: ingredientID=${ingredientID}, new qty=${inventory.qty}`);
  }

  async deductInventoryForOrder(items: { dishID: string; quantity: number }[]): Promise<void> {
    this.logger.log(`Starting deductInventoryForOrder with items: ${JSON.stringify(items)}`);
    try {
      for (const item of items) {
        this.logger.log(`Processing dishID: ${item.dishID}, quantity: ${item.quantity}`);
        const recipes = await this.recipeModel.find({ dishID: item.dishID }).exec();
        if (!recipes || recipes.length === 0) {
          throw new BadRequestException(`Không tìm thấy công thức cho món ăn ${item.dishID}`);
        }

        for (const recipe of recipes) {
          this.logger.log(`Processing recipe: ingredientID=${recipe.ingredientID}, amountRequired=${recipe.amountRequired}`);
          const amountNeeded = recipe.amountRequired * item.quantity;
          await this.deductInventory(recipe.ingredientID.toString(), amountNeeded);
        }
      }
      this.logger.log('Inventory deduction completed successfully');
    } catch (error) {
      this.logger.error(`Error in deductInventoryForOrder: ${error.message}`, error.stack);
      throw error;
    }
  }
}