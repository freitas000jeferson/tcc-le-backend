import { Inject, Injectable } from '@nestjs/common';
import { HistoryEntity } from 'src/entities/History.entity';
import {
  HISTORY_REPOSITORY_NAME,
  IHistoryRepository,
} from 'src/repository/history/i-history.repository';
import { HistoryFactory } from './factories/history-factory';

@Injectable()
export class SaveHistoryService {
  constructor(
    @Inject(HISTORY_REPOSITORY_NAME)
    private readonly historyRepository: IHistoryRepository
  ) {}
  async handle(data: HistoryEntity) {
    if (data.id) {
      return await this.historyRepository.update(
        { id: data.id },
        HistoryFactory.update(data)
      );
    }
    return await this.historyRepository.create(HistoryFactory.create(data));
  }
}
