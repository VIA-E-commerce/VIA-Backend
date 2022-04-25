import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

import { getIsIntMessage, getIsStringMessage, getMinMessage } from '@/common';

import { IMP } from '../constant';

export const ImpRequestDec = {
  impUID() {
    return applyDecorators(
      ApiProperty({
        description: IMP.IMP_UUID.KR,
        example: 'imp_012345678901',
      }),
      IsString({
        message: getIsStringMessage({ property: IMP.IMP_UUID.KR }),
      }),
    );
  },

  reason() {
    return applyDecorators(
      ApiProperty({
        description: IMP.REASON.KR,
        example: '제품 불량',
        required: false,
      }),
      IsString({ message: getIsStringMessage({ property: IMP.REASON.KR }) }),
    );
  },

  amount() {
    return applyDecorators(
      ApiProperty({
        description: IMP.AMOUNT.KR,
        example: 15000,
        required: false,
      }),
      IsInt({ message: getIsIntMessage({ property: IMP.AMOUNT.KR }) }),
      Min(IMP.AMOUNT.MIN, {
        message: getMinMessage({
          property: IMP.AMOUNT.KR,
          min: IMP.AMOUNT.MIN,
        }),
      }),
    );
  },

  checksum() {
    return applyDecorators(
      ApiProperty({
        description: IMP.CHECKSUM.KR,
        example: 10000,
        required: false,
      }),
      IsInt({ message: getIsIntMessage({ property: IMP.CHECKSUM.KR }) }),
      Min(IMP.CHECKSUM.MIN, {
        message: getMinMessage({
          property: IMP.CHECKSUM.KR,
          min: IMP.CHECKSUM.MIN,
        }),
      }),
    );
  },
};
