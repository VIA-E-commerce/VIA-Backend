import { PaymentDoc } from './dto.doc';

interface ImpRestApiResponse {
  access_token: string;
  now: number;
  expired_at: number;
}

export class ImpRestApiDto {
  code?: number;
  message?: string | null;
  response?: ImpRestApiResponse;
}

export class ImpVerifyDto {
  @PaymentDoc.impUID()
  impUID: string;
}

export class ImpRefundRequest {
  impUID: string;
  reason?: string;
  amount?: number;
  checksum?: number;
}
