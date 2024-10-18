import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/commom/repository/mongo/mongo-generic.repository';
import { Question, QuestionDocument } from 'src/model/mongo';
import { IQuestionRepository } from '../i-question.repository';

export class QuestionMongoRepository
  extends MongoGenericRepository<QuestionDocument>
  implements IQuestionRepository
{
  constructor(
    @InjectModel(Question.name)
    private model: Model<QuestionDocument>
  ) {
    super(model);
  }
}
