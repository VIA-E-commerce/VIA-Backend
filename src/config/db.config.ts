import { ConfigType, registerAs } from '@nestjs/config';
import { getMetadataArgsStorage } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { CONFIG } from '@/constant';

export const dbConfig = registerAs(CONFIG.DB, () => {
  const isDevMode = process.env.NODE_ENV === CONFIG.NODE_ENV.DEVELOPMENT;
  return {
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    charset: 'utf8mb4_general_ci',
    synchronize: isDevMode,
    logging: isDevMode,
  };
});

export type DBConfig = ConfigType<typeof dbConfig>;
