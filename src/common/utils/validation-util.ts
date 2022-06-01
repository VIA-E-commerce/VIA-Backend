export interface PropsWithPropertyName {
  property: string;
}
interface PropsWithMinLength extends PropsWithPropertyName {
  minLength: number;
}
interface PropsWithMaxLength extends PropsWithPropertyName {
  maxLength: number;
}
type PropsWithLength = PropsWithMinLength & PropsWithMaxLength;

interface PropsWithMax extends PropsWithPropertyName {
  max: number;
}

interface PropsWithMin extends PropsWithPropertyName {
  min: number;
}

interface MessageOptions extends PropsWithPropertyName {
  description?: string;
  example?: string;
}

export function getMinLengthMessage({
  property,
  minLength,
}: PropsWithMinLength) {
  return `${property}의 길이는 ${minLength}자 이상이어야합니다.`;
}

export function getMaxLengthMessage({
  property,
  maxLength,
}: PropsWithMaxLength) {
  return `${property}의 길이는 ${maxLength}자 이하여야합니다.`;
}

export function getLengthMessage({
  property,
  minLength,
  maxLength,
}: PropsWithLength) {
  return `${property}의 길이는 ${minLength}자 ~ ${maxLength}자 이내여야 합니다.`;
}

export function getIsNotEmptyMessage({ property }: PropsWithPropertyName) {
  return `${property} 입력이 누락되었습니다.`;
}

// 타입 관련 함수
function getTypeCheckMessage(property: string, type: string) {
  return `${property} 필드는 ${type}이어야 합니다.`;
}

export function getIsStringMessage({ property }: PropsWithPropertyName) {
  return getTypeCheckMessage(property, '문자열');
}

export function getIsIntMessage({ property }: PropsWithPropertyName) {
  return getTypeCheckMessage(property, '정수형');
}

export function getIsNumberStringMessage({ property }: PropsWithPropertyName) {
  return getTypeCheckMessage(property, '숫자형 문자열');
}

export function getIsDateMessage({ property }: PropsWithPropertyName) {
  return getTypeCheckMessage(property, '날짜 형식');
}

export function getIsBooleanMessage({ property }: PropsWithPropertyName) {
  return getTypeCheckMessage(property, '논리형');
}

// String 타입 관련 함수
export function getIsUrlMessage({ property }: PropsWithPropertyName) {
  return getTypeCheckMessage(property, 'URL 형식');
}

export function getStringTypeMessage({
  property,
  description,
  example,
}: MessageOptions) {
  const comma = description && example ? ', ' : '';
  const exampleWithPreffix = example ? `ex: ${example}` : '';

  const suffix =
    description || example
      ? ` (${description}${comma}${exampleWithPreffix})`
      : '';

  return `${property}의 형식이 올바르지 않습니다.${suffix}`;
}

export function getIsMobilePhone({ property }: PropsWithPropertyName) {
  return getStringTypeMessage({ property });
}

// 값 크기 관련 함수
export function getMaxMessage({ property, max }: PropsWithMax) {
  return `${property}의 최대값은 ${max}입니다.`;
}

export function getMinMessage({ property, min }: PropsWithMin) {
  return `${property}의 최소값은 ${min}입니다.`;
}
