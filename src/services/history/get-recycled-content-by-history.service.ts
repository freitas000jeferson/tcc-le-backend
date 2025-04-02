import { Inject, Injectable } from '@nestjs/common';
import { addDays } from 'date-fns';
import { HistoryDocument } from 'src/model/mongo';
import {
  HISTORY_REPOSITORY_NAME,
  IHistoryRepository,
} from 'src/repository/history/i-history.repository';
import { GetSettingsService } from '../settings/get-settings.service';
import { PaginationService } from 'src/commom/providers/pagination.service';

interface HandleProps {
  type: string;
  category?: string;
  userId: string;
  length?: number;
}

@Injectable()
export class GetRecycledContentByHistoryService {
  constructor(
    @Inject(HISTORY_REPOSITORY_NAME)
    private readonly historyRepository: IHistoryRepository,
    private readonly getSettingsService: GetSettingsService
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

  async handle({ userId, type, category, length }: HandleProps) {
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
}
