import { FilterQuery } from 'mongoose';
import { PaginationType } from 'src/commom/types/pagination.type';
import { Question, QuestionDocument } from 'src/model/mongo';

export interface IQuestionRepository {
  countDocuments(): Promise<number>;
  findOne(query: FilterQuery<QuestionDocument>): Promise<QuestionDocument>;
  findAll(query: FilterQuery<QuestionDocument>): Promise<QuestionDocument[]>;
  findAllPaginated(
    pagination: PaginationType,
    query: FilterQuery<QuestionDocument>
  ): Promise<QuestionDocument[]>;
  create(data: Question): Promise<QuestionDocument>;
}
export const QUESTION_REPOSITORY_NAME = 'IQuestionRepository';
