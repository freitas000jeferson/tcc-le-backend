import { Inject, Injectable } from '@nestjs/common';
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

  async handle(type: string, userId: string, category: string) {
    return await this.historyRepository.findAll({
      userId: userId,
      categoryId: category,
      type: type,
    });
  }
}
