import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, ObjectId } from 'mongoose';
import {
  IGrammarRepository,
  GRAMMAR_REPOSITORY_NAME,
} from 'src/repository/grammar/i-grammar.repository';
import {
  IQuestionRepository,
  QUESTION_REPOSITORY_NAME,
} from 'src/repository/question/i-question.repository';
import {
  IVocabularyRepository,
  VOCABULARY_REPOSITORY_NAME,
} from 'src/repository/vocabulary/i-vocabulary.repository';
import { HistoryFactory } from '../history/factories/history-factory';
import {
  GrammarDocument,
  VocabularyDocument,
  QuestionDocument,
  HistoryDocument,
} from 'src/model/mongo';
import { PaginationService } from 'src/commom/providers/pagination.service';

interface HandleProps {
  histories: HistoryDocument[];
  category?: ObjectId;
  type: string;
  op: 'NIN' | 'IN';
  length?: number;
}
@Injectable()
export class FindContentByIdsService {
  constructor(
    @Inject(VOCABULARY_REPOSITORY_NAME)
    private readonly vocabularyRepository: IVocabularyRepository,
    @Inject(GRAMMAR_REPOSITORY_NAME)
    private readonly grammarRepository: IGrammarRepository,
    @Inject(QUESTION_REPOSITORY_NAME)
    private readonly questionRepository: IQuestionRepository
  ) {}

  async handle({
    histories,
    category,
    type,
    op,
    length,
  }: HandleProps): Promise<
    (VocabularyDocument | GrammarDocument | QuestionDocument)[]
  > {
    const ids = HistoryFactory.formatIdList(histories, type);

    const filter: FilterQuery<VocabularyDocument>[] = [
      { _id: op === 'NIN' ? { $nin: ids } : { $in: ids } },
    ];
    if (category) {
      filter.push({ categoryId: category });
    }

    const query: FilterQuery<VocabularyDocument> = {
      $and: filter,
    };
    const pagination = PaginationService.build({ size: length });

    let contents: (VocabularyDocument | GrammarDocument | QuestionDocument)[];

    if (type.toUpperCase() === 'VOCABULARY') {
      contents = await this.vocabularyRepository.findAllPaginated(
        pagination,
        query
      );
    } else if (type.toUpperCase() === 'GRAMMAR') {
      contents = await this.grammarRepository.findAllPaginated(
        pagination,
        query
      );
    } else if (type.toUpperCase() === 'QUESTION') {
      contents = await this.questionRepository.findAllPaginated(
        pagination,
        query
      );
    } else {
      return null;
    }
    return contents;
  }
}
