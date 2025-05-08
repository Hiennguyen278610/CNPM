// src/modules/order-detail/order-detail.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDetail } from './schemas/order-detail.schema';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { Order, OrderDocument } from '../order/schemas/order.schema';
import { OrderService } from '../order/order.service';

import aqp from 'api-query-params'; // Change this line

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectModel(OrderDetail.name) private orderDetailModel: Model<OrderDetail>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  private readonly orderService: OrderService, 
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const orderDetail = await this.orderDetailModel.create(createOrderDetailDto);

    const totalprice = await this.orderService.calculateTotalPrice(orderDetail.order.toString());
  
    await this.orderModel.findByIdAndUpdate(orderDetail.order, { totalPrice : totalprice});
  
    return orderDetail._id;
  }

  async findAll(query: string, current: number, pageSize: number) {
    try {
      const { filter, sort } = aqp(query);
      if (filter.current) delete filter.current;
      if (filter.pageSize) delete filter.pageSize;
  
      if (!current) current = 1;
      if (!pageSize) pageSize = 10;
  
      const totalItems = await this.orderDetailModel.countDocuments(filter);
      const totalPages = Math.ceil(totalItems / pageSize);
  
      const skip = (current - 1) * pageSize;
  
      const results = await this.orderDetailModel
        .find(filter)
        .limit(pageSize)
        .skip(skip)
        .populate(['order', 'dish'])
        .sort(sort as any);
      return { results, totalPages };
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new BadRequestException(`Failed to fetch order details: ${error.message}`);
    }
  }

  async findOne(id: string) {
    const orderDetail = await this.orderDetailModel
      .findById(id)
      .populate(['order', 'dish']);
    if (!orderDetail) {
      throw new BadRequestException('OrderDetail not found');
    }
    return orderDetail;
  }

  async update(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
    const orderDetail = await this.orderDetailModel.findByIdAndUpdate(
      id,
      updateOrderDetailDto,
      { new: true },
    );
    if (!orderDetail) {
      throw new BadRequestException('OrderDetail not found');
    }
    return orderDetail._id;
  }

  async remove(id: string) {
    const orderDetail = await this.orderDetailModel.findByIdAndDelete(id);
    if (!orderDetail) {
      throw new BadRequestException('OrderDetail not found');
    }
    return orderDetail._id;
  }
}