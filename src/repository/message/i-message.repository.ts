import { FilterQuery } from 'mongoose';
import { PaginationType } from 'src/commom/types/pagination.type';
import { Message, MessageDocument } from 'src/model/mongo';

export interface IMessageRepository {
  countDocuments(): Promise<number>;
  findOne(query: FilterQuery<MessageDocument>): Promise<MessageDocument>;
  findAll(query: FilterQuery<MessageDocument>): Promise<MessageDocument[]>;
  findAllPaginated(
    pagination: PaginationType,
    query: FilterQuery<MessageDocument>
  ): Promise<MessageDocument[]>;
  create(data: Message): Promise<MessageDocument>;
  insertMany(data: Message[]): Promise<MessageDocument[]>;
}
export const MESSAGE_REPOSITORY_NAME = 'IMessageRepository';
