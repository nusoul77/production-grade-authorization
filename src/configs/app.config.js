import { env } from 'process';

const config = {
  app: {
    admin: {
      email: env.ADMIN_EMAIL || 'admin@admin.com',
      password: env.ADMIN_PASSWORD || 'cfz6jac1gxv*tbr8QWF',
    },
    port: Number(env.PORT) || 3000,
  },
  auth: {
    prefix: env.TOKEN_PREFIX || 'Bearer_',
    secret: env.SECRET || 'secret',
  },
  db: {
    name: env.MONGO_DB_NAME || 'PGA',
    root: env.MONGO_ROOT_NAME || 'root',
    pass: env.MONGO_ROOT_PASS || 'pass',
    host: env.MONGO_HOST || 'localhost',
    port: Number(env.MONGO_PORT) || 27017,
  },
};

export default config;
