import {
  getIsNotEmptyMessage,
  getIsStringMessage,
  getLengthMessage,
  getMaxLengthMessage,
} from '@/common';

export const USER = {
  EMAIL: {
    KR: '이메일',
    MAX_LENGTH: 255,
    get MAX_LENGTH_MESSAGE() {
      return getMaxLengthMessage({
        property: this.KR,
        maxLength: this.MAX_LENGTH,
      });
    },
    get IS_EMAIL_MESSAGE() {
      return `${this.KR} 형식에 맞게 입력해주세요.`;
    },
  },

  PASSWORD: {
    KR: '비밀번호',
    MIN_LENGTH: 8,
    MAX_LENGTH: 255,
    get REG_EXP() {
      return new RegExp(
        `^(?=.*[0-9]).{${this.MIN_LENGTH},${this.MAX_LENGTH}}$`,
      );
    },
    get MATCHES_MESSAGE() {
      return `${this.KR}의 길이는 ${this.MIN_LENGTH}~${this.MAX_LENGTH}자이며 숫자를 포함해야합니다.`;
    },
  },

  NAME: {
    KR: '이름',
    MIN_LENGTH: 2,
    MAX_LENGTH: 17,
    get LENGTH_MESSAGE() {
      return getLengthMessage({
        property: this.KR,
        minLength: this.MIN_LENGTH,
        maxLength: this.MAX_LENGTH,
      });
    },
    get MATCHES_MESSAGE() {
      return `${this.KR}에는 한글, 영문 대소문자 외의 다른 문자를 사용할 수 없습니다.`;
    },
  },

  PHONE: {
    KR: '휴대폰 번호',
    MIN_LENGTH: 10,
    MAX_LENGTH: 11,
    get LENGTH_MESSAGE() {
      return getLengthMessage({
        property: this.KR,
        minLength: this.MIN_LENGTH,
        maxLength: this.MAX_LENGTH,
      });
    },
  },

  ROLE: {
    KR: '권한',
    MAX_LENGTH: 5,
  },

  PROVIDER: {
    KR: 'SNS 서비스 회사',
    MAX_LENGTH: 20,
    get IS_NOT_EMPTY() {
      return getIsNotEmptyMessage(this.KR);
    },
    get IS_STRING_MESSAGE() {
      return getIsStringMessage(this.KR);
    },
  },

  SNS_ID: {
    KR: '연동된 SNS 아이디',
    get IS_NOT_EMPTY() {
      return getIsNotEmptyMessage(this.KR);
    },
    get IS_STRING_MESSAGE() {
      return getIsStringMessage(this.KR);
    },
  },
};
