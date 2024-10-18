import { Inject, Injectable } from '@nestjs/common';
import { InvalidTokenException } from 'src/commom/exceptions';
import {
  ACCESS_TOKEN_REPOSITORY_NAME,
  IAccessTokenRepository,
} from 'src/repository/accessToken/i-access-token.repository';

@Injectable()
export class LogoutService {
  constructor(
    @Inject(ACCESS_TOKEN_REPOSITORY_NAME)
    private accessTokenRepository: IAccessTokenRepository
  ) {}

  async handle(userId: string, token: string) {
    const accessTokenData = await this.accessTokenRepository.findOne({
      userId,
      accessToken: token,
      expired: false,
    });
    if (!accessTokenData) {
      throw new InvalidTokenException();
    }
    accessTokenData.expired = true;
    await accessTokenData.save();
    return { redirect: '/login' };
  }
}
