import { Chat } from 'src/model/mongo';
import { CreateChatDTO } from '../create-chat.service';

export class ChatFactory {
  static createChat({ userId }: CreateChatDTO): Chat {
    const resp = new Chat();
    const date = new Date();
    resp.userId = userId as any;
    resp.createdAt = date;
    resp.updatedAt = date;
    return resp;
  }
}
