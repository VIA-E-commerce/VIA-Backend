import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const PaymentDoc = {
  impUID() {
    return applyDecorators(
      ApiProperty({
        description: '아임포트 결제 정보 UID',
        example: 'imp_012345678901',
      }),
    );
  },
};
