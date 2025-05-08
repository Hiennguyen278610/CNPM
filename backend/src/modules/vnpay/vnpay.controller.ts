import { Controller, Get, Res } from '@nestjs/common';
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
    @Get('vnpay')
    @Public()
    async getPaymentUrl(@Res() response: Response) {
      return response.redirect(
        await this.vnpayService.getPaymentUrl(),
      );
    }
}

