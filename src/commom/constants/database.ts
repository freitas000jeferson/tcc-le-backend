export const DATABASE = {
  env: process.env.ENV,
  name: process.env.DB_MONGO_PREFIX_DATABASE,
  url: process.env.DB_MONGO_URL,
  password: process.env.DB_MONGO_PASSWORD,
} as const;
