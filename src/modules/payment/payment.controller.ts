import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@/models';
import { CurrentUser, JwtAuthGuard } from '@/modules/auth';

import { ImpRefundRequest } from './dto';
import { PaymentService } from './payment.service';
import { PaymentControllerDoc as Doc } from './payment.controller.doc';

@ApiTags('결제 API')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Doc.refund('아임포트 환불')
  @UseGuards(JwtAuthGuard)
  @Post('refund')
  async refund(
    @Body() dto: ImpRefundRequest,
    @CurrentUser() user: User,
  ): Promise<void> {
    return this.paymentService.refund(dto, user);
  }
}
