interface PropsWithPropertyName {
  property: string;
}
interface PropsWithMinLength extends PropsWithPropertyName {
  minLength: number;
}
interface PropsWithMaxLength extends PropsWithPropertyName {
  maxLength: number;
}
type PropsWithLength = PropsWithMinLength & PropsWithMaxLength;

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

// 타입 검증 관련 함수
function getTypeCheckMessage(property: string, type: string) {
  return `${property}의 형식은 ${type}이어야 합니다.`;
}

export function getIsStringMessage({ property }: PropsWithPropertyName) {
  return getTypeCheckMessage(property, '문자열');
}
