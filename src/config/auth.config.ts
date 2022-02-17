import { CONFIG } from '@/constant';
import { ConfigType, registerAs } from '@nestjs/config';

export const authConfig = registerAs(CONFIG.AUTH, () => ({
  usernameField: 'email',
}));

export type AuthConfig = ConfigType<typeof authConfig>;
