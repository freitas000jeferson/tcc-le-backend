import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/commom/repository/mongo/mongo-generic.repository';
import { Category, CategoryDocument } from 'src/model/mongo';
import { ICategoryRepository } from '../i-category.repository';

export class CategoryMongoRepository
  extends MongoGenericRepository<CategoryDocument>
  implements ICategoryRepository
{
  constructor(
    @InjectModel(Category.name)
    private model: Model<CategoryDocument>
  ) {
    super(model);
  }
}
