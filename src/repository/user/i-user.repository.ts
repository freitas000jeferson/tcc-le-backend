import { FilterQuery } from 'mongoose';
import { PaginationType } from 'src/commom/types/pagination.type';
import { User, UserDocument } from 'src/model/mongo';

export interface IUserRepository {
  countDocuments(): Promise<number>;
  findById(id: string): Promise<UserDocument>;
  findOne(query: FilterQuery<UserDocument>): Promise<UserDocument>;
  findAll(query: FilterQuery<UserDocument>): Promise<UserDocument[]>;
  findAllPaginated(
    pagination: PaginationType,
    query: FilterQuery<UserDocument>
  ): Promise<UserDocument[]>;
  create(data: User): Promise<UserDocument>;
  update(filter: FilterQuery<UserDocument>, data: User): Promise<UserDocument>;
}

export const USER_REPOSITORY_NAME = 'IUserRepository';
