import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/commom/repository/mongo/mongo-generic.repository';
import { Message, MessageDocument } from 'src/model/mongo';
import { IMessageRepository } from '../i-message.repository';

export class MessageMongoRepository
  extends MongoGenericRepository<MessageDocument>
  implements IMessageRepository
{
  constructor(
    @InjectModel(Message.name)
    private model: Model<MessageDocument>
  ) {
    super(model);
  }
}
