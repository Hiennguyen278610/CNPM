import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientController } from './ingredients.controller';
import { IngredientService } from './ingredients.service';
import { Ingredient, IngredientSchema } from './schemas/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ingredient.name, schema: IngredientSchema }]),
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}