export const USER = {
  EMAIL: {
    KR: '이메일',
    MAX_LENGTH: 255,
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
  },

  NAME: {
    KR: '이름',
    MIN_LENGTH: 2,
    MAX_LENGTH: 17,
    REG_EXP: /^[a-zA-Z가-힣]+$/,
  },

  PHONE: {
    KR: '휴대폰 번호',
    MIN_LENGTH: 10,
    MAX_LENGTH: 11,
  },

  ROLE: {
    KR: '권한',
    MAX_LENGTH: 5,
  },

  PROVIDER: {
    KR: 'SNS 서비스 회사',
    MAX_LENGTH: 20,
  },

  SNS_ID: {
    KR: '연동된 SNS 아이디',
  },
};
