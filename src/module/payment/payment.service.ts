import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as dayjs from 'dayjs';

import { MESSAGE } from '@/constant';
import { OrderStatus, PaymentMethod } from '@/module/order';

import { ImpRestApiDto, ImpRefundRequest } from './dto';
import { IMPPaymentResponse } from './interface';

@Injectable()
export class PaymentService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async verify(impUID: string, paymentReal: number) {
    // Access 토큰 획득
    const accessToken = await this.getAccessToken();

    // 결제 정보 조회
    const {
      data: { response: paymentData },
    } = await lastValueFrom(
      this.httpService.get<IMPPaymentResponse>(
        `https://api.iamport.kr/payments/${impUID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    );

    // 결제 정보 검증
    const { merchant_uid, paid_at, pay_method } = paymentData;

    if (paymentReal !== paymentData.amount) {
      throw new HttpException(MESSAGE.ERROR.FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    const paidAt = dayjs.unix(paid_at).toDate();
    const paymentMethod = PaymentMethod[pay_method];
    const orderStatus =
      pay_method === 'vbank'
        ? OrderStatus.AWAITING_PAYMENT
        : OrderStatus.PAYMENT_ACCEPTED;

    return { merchantUID: merchant_uid, paidAt, paymentMethod, orderStatus };
  }

  async refund({ impUID, amount, checksum, reason }: ImpRefundRequest) {
    const accessToken = await this.getAccessToken();

    await lastValueFrom(
      this.httpService.post(
        'https://api.iamport.kr/payments/cancel',
        { imp_uid: impUID, amount, checksum, reason },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
          },
        },
      ),
    );
  }

  private async getAccessToken() {
    const { data: impAccessTokenRes } = await lastValueFrom(
      this.httpService.post<ImpRestApiDto>(
        'https://api.iamport.kr/users/getToken',
        {
          imp_key: this.configService.get('IMP_REST_API_KEY'),
          imp_secret: this.configService.get('IMP_REST_API_SECRET'),
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    );

    return impAccessTokenRes.response.access_token;
  }
}
