import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/auth/constants/jwt-constants';
import { AccessTokenPayload } from './access-token-factory';
import { SaveTokenService } from './save-token.service';

@Injectable()
export class CreateAccessTokenService {
  constructor(
    private saveTokenService: SaveTokenService,
    private jwtService: JwtService
  ) {}

  async handle(payload: AccessTokenPayload, userId: string) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: JWT_CONSTANTS().refresh_token_secret,
      algorithm: JWT_CONSTANTS().refresh_token_algorithm,
      expiresIn: JWT_CONSTANTS().refresh_token_expires_in,
    });

    await this.saveTokenService.handle({
      userId: userId,
      expired: false,
      accessToken,
      refreshToken,
    });

    return {
      tokenType: 'Bearer',
      accessToken,
      refreshToken,
      expiresIn: JWT_CONSTANTS().access_token_expires_in,
    };
  }
}
