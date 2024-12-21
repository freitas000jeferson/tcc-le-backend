import { FilterQuery, InsertManyOptions } from 'mongoose';
import { PaginationType } from 'src/commom/types/pagination.type';
import { Category, CategoryDocument } from 'src/model/mongo';

export interface ICategoryRepository {
  countDocuments(): Promise<number>;
  findOne(query: FilterQuery<CategoryDocument>): Promise<CategoryDocument>;
  findAll(query: FilterQuery<CategoryDocument>): Promise<CategoryDocument[]>;
  findAllPaginated(
    pagination: PaginationType,
    query: FilterQuery<CategoryDocument>
  ): Promise<CategoryDocument[]>;
  create(data: Category): Promise<CategoryDocument>;
  update(
    filter: FilterQuery<CategoryDocument>,
    data: Category
  ): Promise<CategoryDocument>;
  insertMany(
    data: Category[],
    options?: InsertManyOptions & { lean: true }
  ): Promise<CategoryDocument[]>;
}
export const CATEGORY_REPOSITORY_NAME = 'ICategoryRepository';
