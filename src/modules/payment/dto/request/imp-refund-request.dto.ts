import { IsNotEmpty, IsOptional } from 'class-validator';

import { ImpRequestDec } from '../decorator';

export class ImpRefundRequest {
  @ImpRequestDec.impUID()
  @IsNotEmpty()
  impUID: string;

  @ImpRequestDec.reason()
  @IsOptional()
  reason?: string;

  @ImpRequestDec.amount()
  @IsOptional()
  amount?: number;

  @ImpRequestDec.checksum()
  @IsOptional()
  checksum?: number;
}
