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
  PHONE: {
    LENGTH: 11,
  },
  ROLE: {
    MAX_LENGTH: 5,
  },
  PROVIDER: {
    MAX_LENGTH: 20,
  },
};

export const USER_ERROR = {
  NOT_FOUND: '회원을 찾을 수 없습니다.',
};
