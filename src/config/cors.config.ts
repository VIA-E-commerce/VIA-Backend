import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig = (DEV_MODE: boolean): CorsOptions => {
  const corsOriginList = DEV_MODE
    ? ['*']
    : process.env.CORS_ORIGIN_LIST.split(',').map((origin) => origin.trim());

  return {
    origin: corsOriginList,
    credentials: true,
  };
};
