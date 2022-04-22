export const CONFIG = {
  AUTH: 'auth',
  DB: 'db',
  ENV_KEY: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
    CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
    NODE_ENV: 'NODE_ENV',
  },
  NODE_ENV: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  },
};
