import { Inject, Injectable } from '@nestjs/common';
import { GetLearningContentQueryDto } from 'src/modules/learn/dto/get-learning-content-query.dto';
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
import {
  HISTORY_REPOSITORY_NAME,
  IHistoryRepository,
} from 'src/repository/history/i-history.repository';
import { FindHistoryService } from './find-history.service';
import { HistoryFactory } from './factories/history-factory';
import {
  GrammarDocument,
  VocabularyDocument,
  QuestionDocument,
  HistoryDocument,
  HistoryType,
} from 'src/model/mongo';
import { GetSettingsService } from '../settings/get-settings.service';
import { PaginationService } from 'src/commom/providers/pagination.service';
import { addDays } from 'date-fns';
import { FilterQuery, ObjectId } from 'mongoose';
import { GetCategoryService } from './get-category.service';

interface HandleProps {
  type: string;
  category: string;
  userId: string;
  length?: number;
}
interface FindContentByIdsProps {
  histories: HistoryDocument[];
  category: ObjectId;
  type: string;
  op: 'NIN' | 'IN';
  length?: number;
}
@Injectable()
export class GetLearningContentService {
  constructor(
    @Inject(VOCABULARY_REPOSITORY_NAME)
    private readonly vocabularyRepository: IVocabularyRepository,
    @Inject(GRAMMAR_REPOSITORY_NAME)
    private readonly grammarRepository: IGrammarRepository,
    @Inject(QUESTION_REPOSITORY_NAME)
    private readonly questionRepository: IQuestionRepository,
    @Inject(HISTORY_REPOSITORY_NAME)
    private readonly historyRepository: IHistoryRepository,
    private readonly findHistoryService: FindHistoryService,
    private readonly getSettingsService: GetSettingsService,
    private readonly getCategoryService: GetCategoryService
  ) {}

  private findNextVisit(timeForNextVisit: number[], nextVisitedId = 0) {
    if (timeForNextVisit[nextVisitedId + 1])
      return {
        nextVisitedId: nextVisitedId + 1,
        nextVisited: timeForNextVisit[nextVisitedId + 1],
      };
    // reinicia as visitas
    return {
      nextVisitedId: 0,
      nextVisited: timeForNextVisit[0],
    };
  }
  private async getRecycledContentByHistory({
    userId,
    type,
    category,
    length,
  }: HandleProps) {
    const settings = await this.getSettingsService.handle();
    const filter = {
      userId: userId,
      categoryId: category,
      type: type,
    };
    // Historias Disponiveis para reciclagem
    // Pega os q expiração é menor igual q a data atual
    const historiesRecycling = await this.historyRepository.findAllPaginated(
      PaginationService.build({ size: length }),
      { ...filter, expiredAt: { $lte: new Date() } }
    );

    if (historiesRecycling.length < length) {
      // reciclagem forçada para completar a lista de conteudo
      // Pega os mais velhos(updatedAt) onde a expiração é maior q a data atual
      const historiesOlds = await this.historyRepository.findAllPaginated(
        PaginationService.build({
          size: length - historiesRecycling.length,
          sort: 'asc',
          order: 'updatedAt',
        }),
        { ...filter, expiredAt: { $gt: new Date() } }
      );
      historiesRecycling.push(...historiesOlds);
    }

    const updateHistories: HistoryDocument[] = [];
    const currentDate = new Date();

    for (const history of historiesRecycling) {
      const { nextVisited, nextVisitedId } = this.findNextVisit(
        settings.timeForNextVisit,
        history.nextVisitedId
      );
      history.nextVisitedId = nextVisitedId;
      history.nextVisited = nextVisited;
      history.updatedAt = currentDate;
      history.expiredAt = addDays(new Date(), nextVisited);
      updateHistories.push(history);
    }
    // atualiza historico
    await Promise.all(updateHistories.map((item) => item.save()));

    return updateHistories;
  }
  private async insertManyHistories(
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

  private async findContentByIds({
    histories,
    category,
    type,
    op,
    length,
  }: FindContentByIdsProps): Promise<
    (VocabularyDocument | GrammarDocument | QuestionDocument)[]
  > {
    const ids = HistoryFactory.formatIdList(histories, type);

    const query: FilterQuery<VocabularyDocument> = {
      $and: [
        { _id: op === 'NIN' ? { $nin: ids } : { $in: ids } },
        { categoryId: category },
      ],
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

  async handle({ type, userId, category, length = 1 }: HandleProps) {
    const categoryDocument = await this.getCategoryService.handle(category);
    const categoryId = categoryDocument.id;

    const histories = await this.findHistoryService.handle(
      type,
      userId,
      categoryId as string
    );
    // faz a busca todos conteudos que nao tem no historico: ids das historias
    const contents = await this.findContentByIds({
      histories,
      category: categoryId as ObjectId,
      type,
      op: 'NIN',
      length,
    });

    if (contents.length > 0) {
      // salva o novos items a serem mostrados
      await this.insertManyHistories(contents, {
        type,
        userId,
        length,
        category: categoryId,
      });
    }
    // BUSCA historias recicladas para fazer parte da lista
    if (contents.length < length) {
      const historiesRecycling = await this.getRecycledContentByHistory({
        length: length - contents.length,
        type,
        userId,
        category: categoryId,
      });
      const contentsRecicling = await this.findContentByIds({
        histories: historiesRecycling,
        category: categoryId,
        type,
        op: 'IN',
        length: length - contents.length,
      });
      contents.push(...contentsRecicling);
    }

    return contents;
  }
}
