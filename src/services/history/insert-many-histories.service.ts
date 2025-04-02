import { Inject, Injectable } from '@nestjs/common';
import {
  GrammarDocument,
  VocabularyDocument,
  QuestionDocument,
  HistoryType,
} from 'src/model/mongo';
import { HistoryFactory } from './factories/history-factory';
import {
  HISTORY_REPOSITORY_NAME,
  IHistoryRepository,
} from 'src/repository/history/i-history.repository';
interface HandleProps {
  type: string;
  category?: string;
  userId: string;
}
@Injectable()
export class InsertManyHistoriesService {
  constructor(
    @Inject(HISTORY_REPOSITORY_NAME)
    private readonly historyRepository: IHistoryRepository
  ) {}

  async handle(
    contents: (VocabularyDocument | GrammarDocument | QuestionDocument)[],
    { category, type, userId }: HandleProps
  ) {
    // salva no historico
    return await this.historyRepository.insertMany(
      contents.map((item) =>
        HistoryFactory.create({
          userId: userId,
          categoryId: category,
          type: type as HistoryType,
          grammarId:
            type === 'GRAMMAR' ? (item as GrammarDocument).id : undefined,
          vocabularyId:
            type === 'VOCABULARY' ? (item as VocabularyDocument).id : undefined,
          questionId:
            type === 'QUESTION' ? (item as QuestionDocument).id : undefined,
          nextVisitedId: 0,
          nextVisited: 1,
        })
      )
    );
  }
}
