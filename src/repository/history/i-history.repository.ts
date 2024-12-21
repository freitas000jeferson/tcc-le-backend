import { FilterQuery, InsertManyOptions } from 'mongoose';
import { PaginationType } from 'src/commom/types/pagination.type';
import { History, HistoryDocument } from 'src/model/mongo';

export interface IHistoryRepository {
  countDocuments(): Promise<number>;
  findOne(query: FilterQuery<HistoryDocument>): Promise<HistoryDocument>;
  findAll(query: FilterQuery<HistoryDocument>): Promise<HistoryDocument[]>;
  findAllPaginated(
    pagination: PaginationType,
    query: FilterQuery<HistoryDocument>
  ): Promise<HistoryDocument[]>;
  create(data: History): Promise<HistoryDocument>;
  update(
    filter: FilterQuery<HistoryDocument>,
    data: History
  ): Promise<HistoryDocument>;
  insertMany(
    data: History[],
    options?: InsertManyOptions & { lean: true }
  ): Promise<HistoryDocument[]>;
  // updateMany(): Promise<HistoryDocument[]>;
  // data: History[],
  // options?: InsertManyOptions & { lean: true }
}
export const HISTORY_REPOSITORY_NAME = 'IHistoryRepository';
