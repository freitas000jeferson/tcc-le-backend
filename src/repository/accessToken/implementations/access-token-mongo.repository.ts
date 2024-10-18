import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/commom/repository/mongo/mongo-generic.repository';
import { AccessToken, AccessTokenDocument } from 'src/model/mongo';
import { IAccessTokenRepository } from '../i-access-token.repository';

export class AccessTokenMongoRepository
  extends MongoGenericRepository<AccessTokenDocument>
  implements IAccessTokenRepository
{
  constructor(
    @InjectModel(AccessToken.name)
    private model: Model<AccessTokenDocument>
  ) {
    super(model);
  }
  async findByToken(token: string): Promise<AccessTokenDocument> {
    return await this.model.findOne({ accessToken: token }).exec();
  }
}
