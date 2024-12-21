import { FilterQuery, InsertManyOptions } from 'mongoose';
import { PaginationType } from 'src/commom/types/pagination.type';
import { Questionnarie, QuestionnarieDocument } from 'src/model/mongo';

export interface IQuestionnarieRepository {
  countDocuments(): Promise<number>;
  findOne(
    query: FilterQuery<QuestionnarieDocument>
  ): Promise<QuestionnarieDocument>;
  findAll(
    query: FilterQuery<QuestionnarieDocument>
  ): Promise<QuestionnarieDocument[]>;
  findAllPaginated(
    pagination: PaginationType,
    query: FilterQuery<QuestionnarieDocument>
  ): Promise<QuestionnarieDocument[]>;
  create(data: Questionnarie): Promise<QuestionnarieDocument>;
  insertMany(
    data: Questionnarie[],
    options?: InsertManyOptions & { lean: true }
  ): Promise<QuestionnarieDocument[]>;

  update(
    filter: FilterQuery<QuestionnarieDocument>,
    data: Questionnarie
  ): Promise<QuestionnarieDocument>;
}
export const QUESTIONNARIE_REPOSITORY_NAME = 'IQuestionnarieRepository';
