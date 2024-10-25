import { Message } from 'src/model/mongo';
import {
  ChatbotMessageRequestDto,
  Sender,
  SendMessageServiceDto,
} from './types';

export class MessageFactory {
  static sendMessage({
    message,
    userId,
  }: SendMessageServiceDto): ChatbotMessageRequestDto {
    return {
      sender: userId as string,
      message: message,
      metadata: {},
    };
  }
  static fromUser({ message, userId }: SendMessageServiceDto): Message {
    const response = new Message();
    response.userId = userId as any;
    response.textBody = message;
    response.imageBody = undefined;
    response.buttonsBody = undefined;
    response.from = Sender.me;
    response.to = Sender.bot;
    response.date = new Date();

    return response;
  }
  static fromBot({ userId, text, image, buttons }): Message {
    // TODO: revisar text, image e parse dos botoes
    const response = new Message();
    response.userId = userId as any;
    response.textBody = text;
    response.imageBody = image;
    response.buttonsBody = buttons;
    response.from = Sender.bot;
    response.to = Sender.me;
    response.date = new Date();
    return response;
  }
}
