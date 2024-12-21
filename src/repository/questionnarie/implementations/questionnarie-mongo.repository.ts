import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/commom/repository/mongo/mongo-generic.repository';
import { Questionnarie, QuestionnarieDocument } from 'src/model/mongo';
import { IQuestionnarieRepository } from '../i-Questionnarie.repository';

export class QuestionnarieMongoRepository
  extends MongoGenericRepository<QuestionnarieDocument>
  implements IQuestionnarieRepository
{
  constructor(
    @InjectModel(Questionnarie.name)
    private model: Model<QuestionnarieDocument>
  ) {
    super(model);
  }
}
