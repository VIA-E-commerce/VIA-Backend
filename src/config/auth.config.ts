import { CONFIG } from '@/constant';
import { ConfigType, registerAs } from '@nestjs/config';

export const authConfig = registerAs(CONFIG.AUTH, () => ({
  usernameField: 'email',
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExp: 60 * 60,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExp: 60 * 60 * 24 * 14,
}));

export type AuthConfig = ConfigType<typeof authConfig>;
