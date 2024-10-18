import { FilterQuery } from 'mongoose';
import { PaginationType } from 'src/commom/types/pagination.type';
import { Chat, ChatDocument } from 'src/model/mongo';

export interface IChatRepository {
  countDocuments(): Promise<number>;
  findOne(query: FilterQuery<ChatDocument>): Promise<ChatDocument>;
  findAllPaginated(
    pagination: PaginationType,
    query: FilterQuery<ChatDocument>
  ): Promise<ChatDocument[]>;
  create(data: Chat): Promise<ChatDocument>;
}
export const CHAT_REPOSITORY_NAME = 'IChatRepository';
