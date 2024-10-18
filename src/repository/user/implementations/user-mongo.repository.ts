import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { MongoGenericRepository } from 'src/commom/repository/indes';
import { User, UserDocument } from 'src/model/mongo';
import { IUserRepository } from '../i-user.repository';

export class UserMongoRepository
  extends MongoGenericRepository<UserDocument>
  implements IUserRepository
{
  constructor(
    @InjectModel(User.name)
    private model: Model<UserDocument>
  ) {
    super(model);
  }

  async findOne(query: FilterQuery<UserDocument>): Promise<UserDocument> {
    return await this.model
      .findOne({ ...query })
      .select('+password') // TODO: add password
      .select('+passwordResetToken') // TODO: add password
      .exec();
  }
}
