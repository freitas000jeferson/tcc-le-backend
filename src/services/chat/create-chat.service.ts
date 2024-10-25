import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/model/mongo';
import {
  CHAT_REPOSITORY_NAME,
  IChatRepository,
} from 'src/repository/chat/i-chat.repository';
import { ChatFactory } from './factories/chat-factory';

export interface CreateChatDTO {
  userId: User | string;
}

@Injectable()
export class CreateChatService {
  constructor(
    @Inject(CHAT_REPOSITORY_NAME)
    private chatRepository: IChatRepository
  ) {}

  async handle({ userId }: CreateChatDTO) {
    const existChat = await this.chatRepository.findOne({ userId });
    if (existChat) {
      return existChat;
    }
    return await this.chatRepository.create(ChatFactory.createChat({ userId }));
  }
}
