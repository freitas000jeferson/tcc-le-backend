import { FilterQuery, InsertManyOptions } from 'mongoose';
import { PaginationType } from 'src/commom/types/pagination.type';

export interface IGenericRepository<T> {
  countDocuments(): Promise<number>;
  findById(id: string): Promise<T>;
  findOne(query: FilterQuery<T>): Promise<T>;
  findAllPaginated(
    pagination: PaginationType,
    query: FilterQuery<T>
  ): Promise<T[]>;
  findAll(query: FilterQuery<T>): Promise<T[]>;
  create(data: T): Promise<T>;
  update(filter: FilterQuery<T>, data: T): Promise<T>;
  delete(id: string): Promise<void>;
  insertMany(
    data: T[],
    options?: InsertManyOptions & { lean: true }
  ): Promise<T[]>;
}
