import { FilterQuery, InsertManyOptions } from 'mongoose';
import { PaginationType } from 'src/commom/types/pagination.type';
import { Grammar, GrammarDocument } from 'src/model/mongo';

export interface IGrammarRepository {
  countDocuments(): Promise<number>;
  findOne(query: FilterQuery<GrammarDocument>): Promise<GrammarDocument>;
  findAll(query: FilterQuery<GrammarDocument>): Promise<GrammarDocument[]>;
  findAllPaginated(
    pagination: PaginationType,
    query: FilterQuery<GrammarDocument>
  ): Promise<GrammarDocument[]>;
  create(data: Grammar): Promise<GrammarDocument>;
  insertMany(
    data: Grammar[],
    options?: InsertManyOptions & { lean: true }
  ): Promise<GrammarDocument[]>;
}
export const GRAMMAR_REPOSITORY_NAME = 'IGrammarRepository';
