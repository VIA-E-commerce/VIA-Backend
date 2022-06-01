import { APP, CONFIG } from '@/constants';
import { ConfigType, registerAs } from '@nestjs/config';

function getOAuthCallbackUrl(baseUrl: string, provider: string) {
  return `${baseUrl}/${APP.GLOBAL_PREFIX}/auth/${provider}/oauth`;
}

export const authConfig = registerAs(CONFIG.AUTH, () => {
  const IS_DEV_MODE = process.env.NODE_ENV === CONFIG.NODE_ENV.DEVELOPMENT;

  const SERVER_BASE_URL = IS_DEV_MODE
    ? `${process.env.HOST}:${process.env.PORT}`
    : process.env.HOST;
  const CLIENT_BASE_URL = IS_DEV_MODE
    ? `${process.env.HOST}:${process.env.CLIENT_PORT}`
    : process.env.HOST;

  return {
    usernameField: 'email',
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExp: 60 * 60 * 24, // 초 단위
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshTokenExp: 60 * 60 * 24 * 14, // 초 단위

    kakaoRestApiKey: process.env.KAKAO_REST_API_KEY,
    kakaoClientSecret: process.env.KAKAO_CLIENT_SECRET,
    kakaoCallbackUrl: getOAuthCallbackUrl(SERVER_BASE_URL, 'kakao'),

    naverClientID: process.env.NAVER_CLIENT_ID,
    naverClientSecret: process.env.NAVER_CLIENT_SECRET,
    naverCallbackUrl: getOAuthCallbackUrl(SERVER_BASE_URL, 'naver'),

    oAuthRedirectUrl: `${CLIENT_BASE_URL}/oauth`,
  };
});

export type AuthConfig = ConfigType<typeof authConfig>;
