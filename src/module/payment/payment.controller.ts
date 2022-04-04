import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ImpRefundRequest } from './dto';
import { PaymentService } from './payment.service';
import { PaymentControllerDoc as Doc } from './payment.controller.doc';

@ApiTags('결제 API')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Doc.refund('아임포트 환불')
  @Post('refund')
  async refund(@Body() dto: ImpRefundRequest) {
    return this.paymentService.refund(dto);
  }
}
