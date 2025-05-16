import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Logger,
  BadRequestException,
  Query,
} from '@nestjs/common';

import { Public } from '@/decorator/customize';
import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsMongoId,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateInventoryDto } from './dto/create-iventory.dto';
import { UpdateInventoryDto } from './dto/update-iventory.dto';
import { InventoryService } from './iventory.service';

class DeductInventoryDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: { dishID: string; quantity: number }[];
}

class OrderItem {
  @IsMongoId()
  @IsNotEmpty()
  dishID: string;

  @IsNumber()
  @Min(1, { message: 'Số lượng phải lớn hơn hoặc bằng 1' })
  quantity: number;
}

@Public()
@Controller('inventory')
export class InventoryController {
  private readonly logger = new Logger(InventoryController.name);

  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  async findAll() {
    return this.inventoryService.findAll();
  }
  @Get('find-by-ingredient')
  findByDishId(@Query('ingredientID') ingredientID: string) {
    return this.inventoryService.findByIngredientID(ingredientID);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.inventoryService.remove(id);
  }

  @Post('deduct')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deductInventory(@Body() deductInventoryDto: DeductInventoryDto) {
    this.logger.log(
      `Received deduct inventory request: ${JSON.stringify(deductInventoryDto)}`,
    );
    try {
      await this.inventoryService.deductInventoryForOrder(
        deductInventoryDto.items,
      );
      return { success: true, message: 'Đã cập nhật kho thành công' };
    } catch (error) {
      this.logger.error(
        `Error in deductInventory: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(error.message || 'Không thể cập nhật kho');
    }
  }
}
