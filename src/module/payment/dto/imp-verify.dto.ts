import { PaymentDoc } from '@/docs';

export class ImpVerifyDto {
  @PaymentDoc.impUID()
  impUID: string;
}
