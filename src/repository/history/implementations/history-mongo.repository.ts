import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/commom/repository/mongo/mongo-generic.repository';
import { History, HistoryDocument } from 'src/model/mongo';
import { IHistoryRepository } from '../i-history.repository';

export class HistoryMongoRepository
  extends MongoGenericRepository<HistoryDocument>
  implements IHistoryRepository
{
  constructor(
    @InjectModel(History.name)
    private model: Model<HistoryDocument>
  ) {
    super(model);
  }
}
