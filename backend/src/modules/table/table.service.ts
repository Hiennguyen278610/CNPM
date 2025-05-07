import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table } from './schemas/table.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TableService {
  constructor(
    @InjectModel('Table') private tableModel: Model<Table>,
  ) {}
  create(createTableDto: CreateTableDto) {
    const { tableName } = createTableDto; // Destructure the DTO to get the properties
    const qrToken = uuidv4(); // Generate a unique token using uuid

    return this.tableModel.create({
      tableName,
      qrToken,
    });
  }


  findAll() {
    return this.tableModel.find();
  }
  async findByQrToken(qrToken: string) {
    const table = await this.tableModel.findOne({ qrToken });
    const qrUrl = `https://quickchart.io/qr?text=${qrToken}`;
    return { table, qrUrl };
  }

  findOne(id: number) {

    return `This action returns a #${id} table`;
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}