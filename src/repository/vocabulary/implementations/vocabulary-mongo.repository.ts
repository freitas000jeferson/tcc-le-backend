import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/commom/repository/mongo/mongo-generic.repository';
import { Vocabulary, VocabularyDocument } from 'src/model/mongo';
import { IVocabularyRepository } from '../i-vocabulary.repository';

export class VocabularyMongoRepository
  extends MongoGenericRepository<VocabularyDocument>
  implements IVocabularyRepository
{
  constructor(
    @InjectModel(Vocabulary.name)
    private model: Model<VocabularyDocument>
  ) {
    super(model);
  }
}
