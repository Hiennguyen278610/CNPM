import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Public } from '@/decorator/customize';
import { UpdateOrderDto } from './dto/update-order.dto';

@Public()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.orderService.findAll(query, +current, +pageSize);
  }
  @Get('find-by-customer-table')
  findByCustomerAndTable(
    @Query('customerID') customerID: string,
    @Query('tableID') tableID: string,
  ) {
    if (!customerID || !tableID) {
      throw new BadRequestException('CustomerID and TableID are required');
    }
    return this.orderService.findByCustomerAndTable(customerID, tableID);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get(':id/total')
  async getTotal(@Param('id') id: string) {
    const totalPrice = await this.orderService.calculateTotalPrice(id);
    return { totalPrice };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
  @Post(':id/status')
  updateStatus(@Param('id') id: string) {
    return this.orderService.updateStatus(id);
  }
}
