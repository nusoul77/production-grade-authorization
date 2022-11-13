import { env } from "process";

const config = {
  app: {
    port: Number(env.PORT) || 3000,
  },
  auth: {
    secret: env.SECRET || "secret",
  },
  db: {
    name: env.MONGO_DB_NAME || "PGA",
    root: env.MONGO_ROOT_NAME || "root",
    pass: env.MONGO_ROOT_PASS || "pass",
    host: env.MONGO_HOST || "localhost",
    port: Number(env.MONGO_PORT) || 27017,
  },
};

export default config;
