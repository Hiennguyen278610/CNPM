import { Injectable } from '@nestjs/common';
import { VnpayService } from 'nestjs-vnpay';
import { ProductCode, VnpLocale, dateFormat } from 'vnpay';


@Injectable()
export class VnpayServices {
  constructor(private readonly vnpayService: VnpayService) {}

  async getBankList() {
    return this.vnpayService.getBankList();
  }
  async getPaymentUrl(total: number, orderId : string) {
    const tomorrow = new Date();
    tomorrow.setMinutes(tomorrow.getMinutes() + 15);
    console

    const paymentUrl = this.vnpayService.buildPaymentUrl({
      vnp_Amount: total * 26000, // Số tiền thanh toán (đơn vị: đồng)
      vnp_IpAddr: '13.160.92.202',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: 'Thanh toan don hang ' + orderId + ' tai VNPAY',
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: `http://${process.env.IPURLBE}:3000/vnpay-return`,
      vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
      vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là thời gian hiện tại
      vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
    });
    return paymentUrl;
  }

  /* ... các phương thức khác ... */
}
