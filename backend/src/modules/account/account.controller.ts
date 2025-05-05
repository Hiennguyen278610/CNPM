import { Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { AccountService } from '@/modules/account/account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import {Public} from '@/decorator/customize';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @Public()
  async findAll(
      @Query() query: any,
      @Query('current') current: string,
      @Query('pageSize') pageSize: string,
  ) {
    return this.accountService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch()
  update(@Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(id);
  }
}
