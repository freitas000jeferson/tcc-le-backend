import { Inject, Injectable } from '@nestjs/common';
import { AccessTokenEntity } from 'src/entities/AccessToken.entity';
import {
  ACCESS_TOKEN_REPOSITORY_NAME,
  IAccessTokenRepository,
} from 'src/repository/accessToken/i-access-token.repository';
import { AccessTokenFactory } from './access-token-factory';

@Injectable()
export class SaveTokenService {
  constructor(
    @Inject(ACCESS_TOKEN_REPOSITORY_NAME)
    private accessTokenRepository: IAccessTokenRepository
  ) {}

  async handle(data: AccessTokenEntity) {
    return await this.accessTokenRepository.create(
      AccessTokenFactory.saveToken(data)
    );
  }
}
