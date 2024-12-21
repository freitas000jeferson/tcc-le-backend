import { HistoryType } from 'src/model/mongo';

export class HistoryEntity {
  id?: string;
  userId: string;
  type: HistoryType;
  nextVisited: number;
  nextVisitedId: number;
  categoryId: string;
  grammarId?: string;
  vocabularyId?: string;
  questionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  expiredAt?: Date;
}
