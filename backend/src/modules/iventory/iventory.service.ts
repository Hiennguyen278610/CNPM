import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe, RecipeDocument } from '../recipe/schemas/recipe.schema';
import { Ingredient, IngredientDocument } from '../ingredients/schemas/ingredient.schema';
import { CreateInventoryDto } from './dto/create-iventory.dto';
import { UpdateInventoryDto } from './dto/update-iventory.dto';
import { Inventory, InventoryDocument } from './schemas/iventory.schema';


@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<InventoryDocument>,
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    try {
      const createdInventory = new this.inventoryModel(createInventoryDto);
      return await createdInventory.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Inventory for this ingredient already exists');
      }
      throw new BadRequestException('Failed to create inventory record');
    }
  }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryModel.find().populate('ingredientID').exec();
  }

  async findOne(id: string): Promise<Inventory> {
    const inventory = await this.inventoryModel.findById(id).populate('ingredientID').exec();
    if (!inventory) {
      throw new NotFoundException(`Inventory record with ID ${id} not found`);
    }
    return inventory;
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    const updatedInventory = await this.inventoryModel
      .findByIdAndUpdate(id, updateInventoryDto, { new: true })
      .populate('ingredientID')
      .exec();
    if (!updatedInventory) {
      throw new NotFoundException(`Inventory record with ID ${id} not found`);
    }
    return updatedInventory;
  }

  async remove(id: string): Promise<void> {
    const result = await this.inventoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Inventory record with ID ${id} not found`);
    }
  }

  async deductInventory(ingredientID: string, amount: number): Promise<void> {
    this.logger.log(`Deducting inventory: ingredientID=${ingredientID}, amount=${amount}`);
    const inventory = await this.inventoryModel.findOne({ ingredientID }).exec();
    if (!inventory) {
      throw new NotFoundException(`Inventory for ingredient ${ingredientID} not found`);
    }
    if (inventory.qty < amount) {
      throw new BadRequestException(`Insufficient ingredient in stock. Need ${amount}, available ${inventory.qty}`);
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
          throw new BadRequestException(`No recipes found for dish ${item.dishID}`);
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

  async checkDishStock(dishID: string, quantity: number): Promise<{ ingredientName: string; availableQty: number; requiredQty: number; unit: string }[]> {
    this.logger.log(`Checking stock for dishID: ${dishID}, quantity: ${quantity}`);
    const issues: { ingredientName: string; availableQty: number; requiredQty: number; unit: string }[] = [];

    try {
      const recipes = await this.recipeModel.find({ dishID }).exec();
      if (!recipes || recipes.length === 0) {
        this.logger.warn(`No recipes found for dish ${dishID}`);
        return issues;
      }

      for (const recipe of recipes) {
        const inventory = await this.inventoryModel.findOne({ ingredientID: recipe.ingredientID }).exec();
        const ingredient = await this.ingredientModel.findById(recipe.ingredientID).exec();
        if (!inventory || !ingredient) {
          issues.push({
            ingredientName: ingredient?.ingredientName || 'Unknown',
            availableQty: 0,
            requiredQty: recipe.amountRequired * quantity,
            unit: ingredient?.unit || 'unit',
          });
          continue;
        }

        const requiredQty = recipe.amountRequired * quantity;
        if (inventory.qty < requiredQty) {
          issues.push({
            ingredientName: ingredient.ingredientName,
            availableQty: inventory.qty,
            requiredQty: requiredQty,
            unit: ingredient.unit,
          });
        }
      }

      this.logger.log(`Stock check completed for dishID: ${dishID}, issues: ${JSON.stringify(issues)}`);
      return issues;
    } catch (error) {
      this.logger.error(`Error in checkDishStock: ${error.message}`, error.stack);
      throw new BadRequestException(`Failed to check stock for dish ${dishID}`);
    }
  }

  async addInventory(ingredientID: string, amount: number): Promise<void> {
    this.logger.log(`Adding inventory: ingredientID=${ingredientID}, amount=${amount}`);
    try {
      const inventory = await this.inventoryModel.findOne({ ingredientID }).exec();
      if (!inventory) {
        throw new NotFoundException(`Inventory for ingredient ${ingredientID} not found`);
      }
      inventory.qty += amount;
      await inventory.save();
      this.logger.log(`Inventory updated: ingredientID=${ingredientID}, new qty=${inventory.qty}`);
    } catch (error) {
      this.logger.error(`Error in addInventory: ${error.message}`, error.stack);
      throw error;
    }
  }
  
  async  findByIngredientID(ingredientID: string){
    return this.inventoryModel.findOne({ingredientID})
  }
}