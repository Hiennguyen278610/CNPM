import { Controller, Get, Query, Res } from '@nestjs/common';
import { VnpayServices } from './vnpay.service';
import { Public } from '@/decorator/customize';
import { Response } from 'express';
@Controller('vnpay')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayServices) {}
  @Get('bank-list')
  @Public()
  async getBankList() {
    return this.vnpayService.getBankList();
  }
  @Get('vnpay-url')
  @Public()
  async getPaymentUrl(@Res() response: Response,@Query('total') total: number,@Query('orderId') orderId: string) {
    return response.redirect(await this.vnpayService.getPaymentUrl(total, orderId));
  }  
}
