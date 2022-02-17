export const USER = {
  EMAIL: {
    MAX_LENGTH: 255,
    MESSAGE: {
      IS_EMAIL: '이메일 형식에 맞게 입력해주세요.',
      IS_NOT_EMPTY: '이메일을 입력해주세요.',
    },
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 255,
    MESSAGE: {
      IS_NOT_EMPTY: '비밀번호를 입력해주세요.',
    },
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 17,
  },
  MOBILE: {
    MATCHES: /^01([0|1|6|7|8|9])-?(\d{3,4})-?(\d{4})$/,
    MESSAGE: {
      MATCHES: '휴대폰 번호 양식에 맞게 입력해주세요.',
    },
  },
};
