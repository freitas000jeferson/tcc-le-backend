import { Button, Message, MessageDocument, User } from 'src/model/mongo';
import {
  ChatbotMessageRequestDto,
  ChatbotMessageResponseDto,
  Sender,
  SendMessageServiceDto,
} from './types';
import { MessageEntity } from 'src/entities/Message.entity';

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
  static fromUser({
    message,
    userId,
    userDate,
  }: SendMessageServiceDto): Message {
    const response = new Message();
    response.userId = userId as any;
    response.textBody = message;
    response.imageBody = undefined;
    response.buttonsBody = undefined;
    response.from = Sender.me;
    response.to = Sender.bot;
    response.userDate = userDate;
    response.date = new Date();

    return response;
  }
  static fromBot(
    messages: ChatbotMessageResponseDto[],
    userId: User | string
  ): Message[] {
    // TODO: revisar text, image e parse dos botoes
    const customMetadataId = messages.findIndex(
      (el) => el.custom && (el.custom.id || el.custom.text)
    );
    let customMetadata: ChatbotMessageResponseDto;
    if (customMetadataId >= 0) {
      customMetadata = messages[customMetadataId];
      messages.splice(customMetadataId, 1);
    }

    const response = messages.map((message) => {
      const messageResponse = new Message();
      messageResponse.userId = userId as any;
      messageResponse.textBody = message?.text;
      messageResponse.imageBody = message?.image;
      messageResponse.buttonsBody = message?.buttons?.map((button, index) => {
        const btn = new Button();
        btn.id = index;
        btn.title = button.title;
        btn.payload = button.payload;
        return btn;
      });
      messageResponse.metadata = customMetadata?.custom;
      messageResponse.from = Sender.bot;
      messageResponse.to = Sender.me;
      messageResponse.date = new Date();
      return messageResponse;
    });
    return response;
  }
  static toEntity(messages: MessageDocument[]): MessageEntity[] {
    return messages.map((msg: MessageDocument) => {
      const res = new MessageEntity();
      res.id = msg._id;
      res.userId = msg.userId;
      res.from = msg.from;
      res.to = msg.to;
      res.textBody = msg.textBody;
      res.imageBody = msg.imageBody;
      res.metadata = msg.metadata;
      res.buttonsBody = msg.buttonsBody;
      res.date = msg.date;
      res.userDate = msg.userDate;
      return res;
    });
  }
}
