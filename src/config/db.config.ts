import { registerAs } from '@nestjs/config';
import { getMetadataArgsStorage } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { APP, CONFIG } from '@/constant';

export const dbConfig = registerAs(CONFIG.DB, () => {
  const isDevMode = process.env.NODE_ENV === APP.NODE_ENV.DEVELOPMENT;
  return {
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    charset: 'utf8mb4_unicode_ci',
    synchronize: isDevMode,
    logging: isDevMode,
  };
});
