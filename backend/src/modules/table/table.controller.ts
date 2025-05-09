import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Public } from '@/decorator/customize';
@Public()

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }
  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Get('qr/:qrToken')
  findByQrToken(@Param('qrToken') qrToken: string) {
    return this.tableService.findByQrToken(qrToken);
  }
  @Get(':id')
  findOne(@Param('qrToken') qrToken : string) {
    return this.tableService.findOne(qrToken);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTableDto: UpdateTableDto,
  ) {
    return this.tableService.update(id, updateTableDto);
  }
}
