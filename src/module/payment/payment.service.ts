import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import * as dayjs from 'dayjs';

import { throwExceptionOrNot } from '@/common';
import { EXCEPTION } from '@/docs';
import {
  Order,
  OrderStatus,
  PaymentMethod,
  User,
  UserRepository,
} from '@/models';

import { ImpRestApiDto, ImpRefundRequest } from './dto';
import { IMPPaymentResponse, IMPPaymentCancelResponse } from './interface';

@Injectable()
export class PaymentService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userRepository: UserRepository,
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

    throwExceptionOrNot(
      paymentReal === paymentData.amount,
      EXCEPTION.COMMON.FORBIDDEN,
    );

    const paidAt = dayjs.unix(paid_at).toDate();
    const paymentMethod = PaymentMethod[pay_method];
    const orderStatus =
      pay_method === 'vbank'
        ? OrderStatus.AWAITING_PAYMENT
        : OrderStatus.PAYMENT_ACCEPTED;

    return { merchantUID: merchant_uid, paidAt, paymentMethod, orderStatus };
  }

  async refund(
    { impUID, amount, checksum, reason }: ImpRefundRequest,
    user: User,
  ) {
    const accessToken = await this.getAccessToken();

    try {
      const {
        data: { response },
      } = await lastValueFrom(
        this.httpService.post<IMPPaymentCancelResponse>(
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

      const { merchant_uid } = response;

      const order = await this.orderRepository.findOne({
        merchantUID: merchant_uid,
      });

      throwExceptionOrNot(order, EXCEPTION.ORDER.NOT_FOUND);

      if (order.status === OrderStatus.DELIVERED) {
        await this.userRepository.update(user, {
          point: user.point - order.point,
        });
      }
    } catch (err) {
      throw err;
    }
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
