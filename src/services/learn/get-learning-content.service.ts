import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import {
  GrammarDocument,
  VocabularyDocument,
  QuestionDocument,
} from 'src/model/mongo';

import { GetRecycledContentByHistoryService } from '../history/get-recycled-content-by-history.service';
import { InsertManyHistoriesService } from '../history/insert-many-histories.service';
import { FindContentByIdsService } from './find-content-by-ids.service';
import { FindHistoryService } from '../history/find-history.service';
import { GetCategoryService } from '../category/get-category.service';

export interface HandleProps {
  type: string;
  category: string;
  userId: string;
  length?: number;
  categoryId?: any;
}

type HandleResponse = (
  | VocabularyDocument
  | GrammarDocument
  | QuestionDocument
)[];

@Injectable()
export class GetLearningContentService {
  constructor(
    private readonly findContentByIdsService: FindContentByIdsService,
    private readonly getRecycledContentByHistoryService: GetRecycledContentByHistoryService,
    private readonly findHistoryService: FindHistoryService,
    private readonly getCategoryService: GetCategoryService,
    private readonly insertManyHistoriesService: InsertManyHistoriesService
  ) {}

  async handle({
    type,
    userId,
    category,
    length = 1,
    categoryId,
  }: HandleProps): Promise<HandleResponse> {
    if (!categoryId) {
      const categoryDocument = await this.getCategoryService.handle(category);
      categoryId = categoryDocument.id;
    }
    // busca o conteudo ja visto(presente no historico)
    const histories = await this.findHistoryService.handle(
      type,
      userId,
      categoryId as string
    );
    // faz a busca todos conteudos que nao tem no historico: ids das historias
    const contents = await this.findContentByIdsService.handle({
      histories,
      category: categoryId as ObjectId,
      type,
      op: 'NIN',
      length,
    });

    if (contents.length > 0) {
      // salva o novos items a serem mostrados
      await this.insertManyHistoriesService.handle(contents, {
        type,
        userId,
        category: categoryId,
      });
    }
    // BUSCA historias recicladas para fazer parte da lista
    if (contents.length < length) {
      const historiesRecycling =
        await this.getRecycledContentByHistoryService.handle({
          length: length - contents.length,
          type,
          userId,
          category: categoryId,
        });
      const contentsRecicling = await this.findContentByIdsService.handle({
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
