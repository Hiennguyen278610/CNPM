// src/modules/dish/dish.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dish, DishSchema } from './schemas/dish.schema';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
  ],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}
