import { FilterQuery } from 'mongoose';
import { AccessToken, AccessTokenDocument } from 'src/model/mongo';

export interface IAccessTokenRepository {
  findOne(
    query: FilterQuery<AccessTokenDocument>
  ): Promise<AccessTokenDocument>;

  findById(id: string): Promise<AccessTokenDocument>;

  findByToken(token: string): Promise<AccessTokenDocument>;

  create(data: AccessToken): Promise<AccessTokenDocument>;

  update(
    filter: FilterQuery<AccessTokenDocument>,
    data: AccessToken
  ): Promise<AccessTokenDocument>;

  delete(id: string): Promise<void>;
}
export const ACCESS_TOKEN_REPOSITORY_NAME = 'IAccessTokenRepository';
