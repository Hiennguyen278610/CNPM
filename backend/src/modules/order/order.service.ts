import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import aqp from 'api-query-params';
import { OrderDetail, OrderDetailDocument } from '../order-detail/schemas/order-detail.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderDetail.name) private readonly orderDetailModel: Model<OrderDetailDocument>,
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<{ success: boolean; id: string }> {
    try {
      console.log('Dữ liệu order:', createOrderDto);
      const { customerID, tableID, orderStatus, totalPrice } = createOrderDto;

      if (!customerID || !tableID || orderStatus === undefined || totalPrice <= 0) {
        throw new BadRequestException('Dữ liệu không hợp lệ hoặc totalPrice không hợp lệ');
      }

      const order = await this.orderModel.create(createOrderDto);
      console.log('Đã lưu order:', order);
      return { success: true, id: order._id.toString() };
    } catch (err) {
      console.error('Lỗi khi lưu order:', err);
      throw new BadRequestException(err.message || 'Không thể tạo order');
    }
  }

  async findAll(query: any, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
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
      .sort(sort as any)
      .populate('customerID')
      .populate('tableID');
    return { results, totalPages };
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id).populate('customerID').populate('tableID');
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
    return { success: true, id: order._id.toString() };
  }

  async remove(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    return { success: true, id: order._id.toString() };
  }

  async calculateTotalPrice(orderId: string): Promise<number> {
    const orderDetails = await this.orderDetailModel
      .find({ order: orderId })
      .populate('dish');
    const totalPrice = orderDetails.reduce((sum, detail) => {
      const dish = detail.dish as unknown as { dishPrice: number };
      return sum + dish.dishPrice * detail.quantity;
    }, 0);
    return totalPrice;
  }

  async updateStatus(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new BadRequestException('Đơn hàng không tồn tại');
    }

    // Chuyển đổi trạng thái: 0 thành 1, 1 thành 0
    const newStatus = order.orderStatus === 0 ? 1 : 0;

    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      { orderStatus: newStatus },
      { new: true },
    );

    if (!updatedOrder) {
      throw new BadRequestException('Đơn hàng không tồn tại');
    }

    return { success: true, id: updatedOrder._id.toString(), orderStatus: updatedOrder.orderStatus };
  }


}