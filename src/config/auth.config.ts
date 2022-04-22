import { APP, CONFIG } from '@/constant';
import { ConfigType, registerAs } from '@nestjs/config';

function getOAuthCallbackUrl(baseUrl: string, provider: string) {
  return `${baseUrl}/${APP.GLOBAL_PREFIX}/auth/${provider}/oauth`;
}

export const authConfig = registerAs(CONFIG.AUTH, () => {
  const SERVER_BASE_URL = process.env.SERVER_BASE_URL;
  const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

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
