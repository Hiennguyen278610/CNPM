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
import { InventoryService } from './iventory.service';
import { UpdateInventoryDto } from './dto/update-iventory.dto';

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

class CheckDishStockDto {
  @IsMongoId()
  @IsNotEmpty()
  dishId: string;

  @IsNumber()
  @Min(1, { message: 'Số lượng phải lớn hơn hoặc bằng 1' })
  quantity: number;
}

class AddInventoryDto {
  @IsMongoId()
  @IsNotEmpty()
  ingredientID: string;

  @IsNumber()
  @Min(0, { message: 'Số lượng phải lớn hơn hoặc bằng 0' })
  amount: number;
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

  @Post('add')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addInventory(@Body() addInventoryDto: AddInventoryDto) {
    this.logger.log(`Received add inventory request: ${JSON.stringify(addInventoryDto)}`);
    try {
      await this.inventoryService.addInventory(addInventoryDto.ingredientID, addInventoryDto.amount);
      return { success: true, message: 'Đã thêm số lượng vào kho thành công' };
    } catch (error) {
      this.logger.error(`Error in addInventory: ${error.message}`, error.stack);
      throw new BadRequestException(error.message || 'Không thể thêm số lượng vào kho');
    }
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

  @Post('check-dish-stock')
  @UsePipes(new ValidationPipe({ transform: true }))
  async checkDishStock(@Body() checkDishStockDto: CheckDishStockDto) {
    this.logger.log(`Received check dish stock request: ${JSON.stringify(checkDishStockDto)}`);
    try {
      const issues = await this.inventoryService.checkDishStock(checkDishStockDto.dishId, checkDishStockDto.quantity);
      return { success: true, issues };
    } catch (error) {
      this.logger.error(`Error in checkDishStock: ${error.message}`, error.stack);
      throw new BadRequestException(error.message || 'Không thể kiểm tra tồn kho món ăn');
    }
  }

  @Post('max-dish-quantity')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getMaxDishQuantity(@Body() body: { dishId: string }) {
    this.logger.log(`Received get max dish quantity request: ${JSON.stringify(body)}`);
    try {
      const maxQty = await this.inventoryService.getMaxDishQuantity(body.dishId);
      return { success: true, maxQty };
    } catch (error) {
      this.logger.error(`Error in getMaxDishQuantity: ${error.message}`, error.stack);
      throw new BadRequestException(error.message || 'Không thể kiểm tra số lượng tối đa');
    }
  }
}
