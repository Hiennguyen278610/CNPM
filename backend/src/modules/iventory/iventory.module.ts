import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ingredient, IngredientSchema } from '../ingredients/schemas/ingredient.schema';
import { Recipe, RecipeSchema } from '../recipe/schemas/recipe.schema';
import { InventoryController } from './iventory.controller';
import { InventoryService } from './iventory.service';
import { Inventory, InventorySchema } from './schemas/iventory.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
      { name: Recipe.name, schema: RecipeSchema },
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}