import { FilterQuery } from 'mongoose';
import { PaginationType } from 'src/commom/types/pagination.type';
import { Vocabulary, VocabularyDocument } from 'src/model/mongo';

export interface IVocabularyRepository {
  countDocuments(): Promise<number>;
  findOne(query: FilterQuery<VocabularyDocument>): Promise<VocabularyDocument>;
  findAll(
    query: FilterQuery<VocabularyDocument>
  ): Promise<VocabularyDocument[]>;
  findAllPaginated(
    pagination: PaginationType,
    query: FilterQuery<VocabularyDocument>
  ): Promise<VocabularyDocument[]>;
  create(data: Vocabulary): Promise<VocabularyDocument>;
}
export const VOCABULARY_REPOSITORY_NAME = 'IVocabularyRepository';
