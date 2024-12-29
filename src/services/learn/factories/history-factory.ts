import { HistoryEntity } from 'src/entities/History.entity';
import { History, HistoryDocument } from 'src/model/mongo';
import { addDays } from 'date-fns';
import { ObjectId } from 'mongoose';

export class HistoryFactory {
  static create(data: HistoryEntity): History {
    const resp = new History();
    const date = new Date();
    resp.categoryId = data.categoryId as any;
    resp.userId = data.userId as any;
    resp.type = data.type;
    resp.nextVisited = data.nextVisited;
    resp.nextVisitedId = data.nextVisitedId;
    resp.categoryId = data.categoryId as any;
    resp.grammarId = data.grammarId as any;
    resp.vocabularyId = data.vocabularyId as any;
    resp.questionId = data.questionId as any;
    resp.createdAt = date;
    resp.updatedAt = date;
    resp.expiredAt = addDays(date, data.nextVisited);

    return resp;
  }
  static update(data: HistoryEntity): History {
    const resp = new History();
    const date = new Date();

    resp.userId = data.userId as any;
    resp.type = data.type;
    resp.categoryId = data.categoryId as any;
    resp.grammarId = data.grammarId as any;
    resp.vocabularyId = data.vocabularyId as any;
    resp.questionId = data.questionId as any;
    resp.nextVisited = data.nextVisited;
    resp.nextVisitedId = data.nextVisitedId;
    resp.createdAt = data.createdAt;
    resp.updatedAt = date;
    resp.expiredAt = addDays(date, data.nextVisited);

    return resp;
  }
  static parseEntity(data: HistoryDocument) {
    return {
      id: data.id,
      userId: data.userId,
      type: data.type,
      nextVisited: data.nextVisited,
      nextVisitedId: data.nextVisitedId,
      categoryId: data.categoryId,
      grammarId: data.grammarId,
      vocabularyId: data.vocabularyId,
      questionId: data.questionId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      expiredAt: data.expiredAt,
    };
  }

  static formatIdList(data: HistoryDocument[], type: string) {
    return data.map((item) => {
      if (item.type === type) {
        if (item.type === 'VOCABULARY' && item.vocabularyId)
          return item.vocabularyId;
        if (item.type === 'GRAMMAR' && item.grammarId) return item.grammarId;
        if (item.type === 'QUESTION' && item.questionId) return item.questionId;
      }
    });
  }
}
