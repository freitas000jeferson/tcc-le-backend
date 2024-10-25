import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ChatbotHttpModule } from 'src/commom/http/chatbot-http.module';
import { ModelDefinitions } from 'src/model/mongo/model-definitions';
import { MESSAGE_REPOSITORY_NAME } from 'src/repository/message/i-message.repository';
import { MessageMongoRepository } from 'src/repository/message/implementations/message-mongo.repository';
import { CreateMessageService } from 'src/services/message/create-message.service';
import { SendMessageService } from 'src/services/message/send-message.service';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [
    ChatbotHttpModule,
    AuthModule,
    MongooseModule.forFeature([
      ModelDefinitions.AccessToken,
      ModelDefinitions.User,
      ModelDefinitions.Message,
    ]),
  ],
  controllers: [MessagesController],
  providers: [
    // service principal
    MessagesService,

    // services: messages
    SendMessageService,
    CreateMessageService,

    // implementacoes dos repositorios
    { provide: MESSAGE_REPOSITORY_NAME, useClass: MessageMongoRepository },
  ],
})
export class MessagesModule {}
