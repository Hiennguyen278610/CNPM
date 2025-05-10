import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model } from 'mongoose';
import aqp from 'api-query-params';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomerService {

  constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) {}

  create(createCustomerDto: CreateCustomerDto) {
    const customerId = uuidv4(); // Generate a unique customerId using uuid
    const { accountId, name, phone } = createCustomerDto; // Destructure the DTO to get the properties
    const newCustomer = {
      customerId,
      accountId,
      name,
      phone,
    };
    return this.customerModel.create(newCustomer);
  }
  async findAll(query: string, current: number, pageSize: number) {
    const {filter, sort} = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.customerModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * (pageSize);

    const results = await this.customerModel.find(filter).limit(pageSize).skip(skip).sort(sort as any);
    return {results, totalPages};
  }
  findOne(id: string) {
    return this.customerModel.findById(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true });
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }
}