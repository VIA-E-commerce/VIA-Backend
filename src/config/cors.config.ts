import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig = (DEV_MODE: boolean): CorsOptions => {
  const corsOriginList = [];

  const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

  if (DEV_MODE) {
    corsOriginList.push('*');
  } else {
    if (CLIENT_BASE_URL) {
      corsOriginList.push(CLIENT_BASE_URL);
    }

    if (process.env.CORS_ORIGIN_LIST) {
      process.env.CORS_ORIGIN_LIST.split(',').map((origin) =>
        corsOriginList.push(origin.trim()),
      );
    }
  }

  return {
    origin: corsOriginList,
    credentials: true,
  };
};
