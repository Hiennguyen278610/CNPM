  // src/modules/order/order.service.ts
  import { BadRequestException, Injectable } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Order } from './schemas/order.schema';
  import { CreateOrderDto } from './dto/create-order.dto';
  import { UpdateOrderDto } from './dto/update-order.dto';
  import aqp from 'api-query-params'; // Change this line

  @Injectable()
  export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

    async create(createOrderDto: CreateOrderDto) {
      const order = await this.orderModel.create(createOrderDto);
      return order._id;
    }

    async findAll(query: any, current: number, pageSize: number) {
      const { filter, sort } = aqp(query); // Now aqp is a callable function
      if (filter.current) delete filter.current;
      if (filter.pageSize) delete filter.pageSize;

      if (!current) current = 1;
      if (!pageSize) pageSize = 10;

      const totalItems = (await this.orderModel.find(filter)).length;
      const totalPages = Math.ceil(totalItems / pageSize);

      const skip = (current - 1) * pageSize;

      const results = await this.orderModel
        .find(filter)
        .limit(pageSize)
        .skip(skip)
        .populate(['clerk', 'customer', 'table', 'orderDetail', 'payment'])
        .sort(sort as any);
      return { results, totalPages };
    }

    async findOne(id: string) {
      const order = await this.orderModel
        .findById(id)
        .populate(['clerk', 'customer', 'table', 'orderDetail', 'payment']);
      if (!order) {
        throw new BadRequestException('Order not found');
      }
      return order;
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
      const order = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
        new: true,
      });
      if (!order) {
        throw new BadRequestException('Order not found');
      }
      return order._id;
    }

    async remove(id: string) {
      const order = await this.orderModel.findByIdAndDelete(id);
      if (!order) {
        throw new BadRequestException('Order not found');
      }
      return order._id;
    }
  }