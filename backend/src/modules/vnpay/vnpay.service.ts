import { Injectable } from '@nestjs/common';
import { VnpayService } from 'nestjs-vnpay';
import { ProductCode, VnpLocale, dateFormat } from 'vnpay';


@Injectable()
export class VnpayServices {
  constructor(private readonly vnpayService: VnpayService) {}

  async getBankList() {
    return this.vnpayService.getBankList();
  }
  async getPaymentUrl() {
    const tomorrow = new Date();
    tomorrow.setMinutes(tomorrow.getMinutes() + 15);

    const paymentUrl = this.vnpayService.buildPaymentUrl({
      vnp_Amount: 1000000,
      vnp_IpAddr: '13.160.92.202',
      vnp_TxnRef: '123456',
      vnp_OrderInfo: 'Thanh toan don hang 123456',
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: 'http://localhost:3000/vnpay-return',
      vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
      vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là thời gian hiện tại
      vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
    });
    return paymentUrl;
  }

  /* ... các phương thức khác ... */
}
