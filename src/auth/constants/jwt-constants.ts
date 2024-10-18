export const JWT_CONSTANTS = () =>
  ({
    jwt_secret: process.env.API_JWT_SECRET,
    access_token_algorithm: 'HS384',
    refresh_token_algorithm: 'HS256',
    token_secret: process.env.API_TOKEN_SECRET,
    refresh_token_secret: process.env.API_REFRESH_TOKEN_SECRET,
    access_token_expires_in: process.env.API_ACCESS_TOKEN_EXPIRES_IN,
    refresh_token_expires_in: process.env.API_REFRESH_TOKEN_EXPIRES_IN,
    reset_token_expires_in: process.env.API_RESET_TOKEN_EXPIRES_IN,
  } as const);
