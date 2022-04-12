import { CONFIG } from '@/constant';
import { ConfigType, registerAs } from '@nestjs/config';

export const authConfig = registerAs(CONFIG.AUTH, () => ({
  usernameField: 'email',
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExp: 60 * 60 * 24, // 초 단위
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExp: 60 * 60 * 24 * 14, // 초 단위

  kakaoRestApiKey: process.env.KAKAO_REST_API_KEY,
  kakaoClientSecret: process.env.KAKAO_CLIENT_SECRET,
  kakaoCallbackUrl: process.env.KAKAO_CALLBACK_URL,

  naverClientID: process.env.NAVER_CLIENT_ID,
  naverClientSecret: process.env.NAVER_CLIENT_SECRET,
  naverCallbackUrl: process.env.NAVER_CALLBACK_URL,

  oAuthRedirectUrl: `${process.env.CLIENT_BASE_URL}/oauth`,
}));

export type AuthConfig = ConfigType<typeof authConfig>;
