import { Inject, Injectable } from '@nestjs/common';
import {
  IMessageRepository,
  MESSAGE_REPOSITORY_NAME,
} from 'src/repository/message/i-message.repository';
import { MessageFactory } from './message-factory';
import { SendMessageService } from './send-message.service';
import { SendMessageServiceDto } from './types';

@Injectable()
export class CreateMessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY_NAME)
    private messageRepository: IMessageRepository,
    private readonly sendMessageService: SendMessageService
  ) {}

  async handle(dto: SendMessageServiceDto) {
    const userMessage = MessageFactory.fromUser(dto);

    const botResponse = await this.sendMessageService.handle(dto);
    const botMessage = MessageFactory.fromBot(botResponse);

    await this.messageRepository.insertMany([userMessage, botMessage]);
    return {};
  }
}
