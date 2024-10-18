import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { AccessTokenDocument } from 'src/model/mongo';
import {
  ACCESS_TOKEN_REPOSITORY_NAME,
  IAccessTokenRepository,
} from 'src/repository/accessToken/i-access-token.repository';

@Injectable()
export class FindAccessTokenService {
  constructor(
    @Inject(ACCESS_TOKEN_REPOSITORY_NAME)
    private accessTokenRepository: IAccessTokenRepository
  ) {}

  async handle(query?: FilterQuery<AccessTokenDocument>) {
    return await this.accessTokenRepository.findOne({
      ...query,
    });
  }
}
