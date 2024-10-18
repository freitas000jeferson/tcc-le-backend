import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/commom/repository/mongo/mongo-generic.repository';
import { Grammar, GrammarDocument } from 'src/model/mongo';
import { IGrammarRepository } from '../i-grammar.repository';

export class GrammarMongoRepository
  extends MongoGenericRepository<GrammarDocument>
  implements IGrammarRepository
{
  constructor(
    @InjectModel(Grammar.name)
    private model: Model<GrammarDocument>
  ) {
    super(model);
  }
}
