import { verify } from 'jsonwebtoken';
import { JWT_CONSTANTS } from '../constants/jwt-constants';

export class ValidateJwtPayloadService {
  static handle(token: string) {
    // Verifica se é um token valido
    const payload: any = verify(token, JWT_CONSTANTS().jwt_secret, {
      ignoreExpiration: false,
    });
    if (payload?.email) return { userId: payload.sub, email: payload.email };
    return payload;
  }
}
