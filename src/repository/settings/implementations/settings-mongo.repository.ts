import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/commom/repository/mongo/mongo-generic.repository';
import { Settings, SettingsDocument } from 'src/model/mongo';
import { ISettingsRepository } from '../i-settings.repository';

export class SettingsMongoRepository
  extends MongoGenericRepository<SettingsDocument>
  implements ISettingsRepository
{
  constructor(
    @InjectModel(Settings.name)
    private model: Model<SettingsDocument>
  ) {
    super(model);
  }
}
