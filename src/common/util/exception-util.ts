import { HttpException } from '@nestjs/common';

import { ExceptionObject } from '@/docs';

export function handleException(
  { status, message }: ExceptionObject,
  error?: any,
) {
  throw error || new HttpException(message, status);
}

/**
 * 첫번째 인수로 넘긴 `successCondition`이 거짓일 때 예외가 발생합니다.
 *
 * (논리형이면 false, 문자열이면 empty, 숫자면 0, 객체면 null)
 */
export function throwExceptionOrNot(
  successCondition: boolean | string | number | object,
  exceptionObject: ExceptionObject,
) {
  if (!successCondition) {
    handleException(exceptionObject);
  }
}
