import { authConfig } from './auth.config';
import { dbConfig } from './db.config';

export const configs = [authConfig, dbConfig];

export * from './cors.config';
export * from './swagger.config';
