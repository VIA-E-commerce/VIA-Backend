export const AUTH = {
  SALT: 10,
};

export const AUTH_ERROR = {
  DUPLICATE_EMAIL: '이미 등록된 이메일입니다.',
  JOIN_ERROR: '회원가입 중 알 수 없는 오류가 발생했습니다.',
  BAD_AUTH_REQUEST: '잘못된 인증 정보입니다.',
  JWT_ERROR: '토큰 발급 중 오류가 발생했습니다.',
  MISMATCHED_SNS_INFO: '다른 SNS 아이디가 계정과 연동되어 있습니다.',
  UNAUTHORIZED: '접근 권한이 없습니다.',
  REFRESH_FAILURE: 'Refresh 토큰 갱신에 실패했습니다.',
};

export const STRATEGY = {
  LOCAL: 'local',
  KAKAO: 'kakao',
  NAVER: 'naver',
  JWT: 'jwt',
  JWT_REFRESH: 'jwt-refresh',
};
