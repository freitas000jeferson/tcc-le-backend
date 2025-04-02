import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { HistoryDocument } from 'src/model/mongo';
import {
  HISTORY_REPOSITORY_NAME,
  IHistoryRepository,
} from 'src/repository/history/i-history.repository';

@Injectable()
export class FindHistoryService {
  constructor(
    @Inject(HISTORY_REPOSITORY_NAME)
    private readonly historyRepository: IHistoryRepository
  ) {}

  async handle(type: string, userId: string, category?: string) {
    const filter: FilterQuery<HistoryDocument> = {
      userId: userId,
      type: type,
    };
    if (category) {
      filter.categoryId = category;
    }
    return await this.historyRepository.findAll({ ...filter });
  }
}
