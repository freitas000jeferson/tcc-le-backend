import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/commom/repository/mongo/mongo-generic.repository';
import { Chat, ChatDocument } from 'src/model/mongo';
import { IChatRepository } from '../i-chat.repository';

export class ChatMongoRepository
  extends MongoGenericRepository<ChatDocument>
  implements IChatRepository
{
  constructor(
    @InjectModel(Chat.name)
    private model: Model<ChatDocument>
  ) {
    super(model);
  }
}
