import { Inject, Injectable } from '@nestjs/common';
import {
  IMessageRepository,
  MESSAGE_REPOSITORY_NAME,
} from 'src/repository/message/i-message.repository';
import { MessageFactory } from './message-factory';
import { SendMessageService } from './send-message.service';
import { ChatbotMessageResponseDto, SendMessageServiceDto } from './types';

@Injectable()
export class CreateMessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY_NAME)
    private messageRepository: IMessageRepository,
    private readonly sendMessageService: SendMessageService
  ) { }

  async handle(dto: SendMessageServiceDto) {
    const userMessage = MessageFactory.fromUser(dto);

    const botResponse: ChatbotMessageResponseDto[] =
      await this.sendMessageService.handle(dto);

    const botMessages = MessageFactory.fromBot(botResponse, dto.userId);

    const messages = await this.messageRepository.insertMany([
      userMessage,
      ...botMessages,
    ]);

    return MessageFactory.toEntity(messages);
  }
}
