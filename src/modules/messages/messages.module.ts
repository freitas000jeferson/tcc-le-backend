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
import { SpeechToTextServiceV2 } from 'src/services/transcription/speech-to-text.service';
import { MessageGateway } from './message.gateway';
import { AuthorizationService } from 'src/auth/providers/authorization.service';
import { ConnectionsService } from './connections.service';
import { RabbitmqModule } from 'src/services/rabbitmq/rabbitmq.module';
import { SpeechToTextService } from 'src/services/speech/speech-to-text.service';
import { SpeechAnalysisCallbackService } from 'src/services/speech/speech-analysis-callback.service';
import { SpeechAnalysisService } from 'src/services/speech/speech-analysis.service';
import { AudioAnalysisMongoRepository } from 'src/repository/audioAnalysis/implementations/audio-analysis-mongo.repository';
import { AUDIO_ANALYSIS_REPOSITORY_NAME } from 'src/repository/audioAnalysis/i-audio-analysis.repository';

@Module({
  imports: [
    ChatbotHttpModule,
    AuthModule,
    RabbitmqModule,
    MongooseModule.forFeature([
      ModelDefinitions.AccessToken,
      ModelDefinitions.User,
      ModelDefinitions.Message,
      ModelDefinitions.AudioAnalysis,
    ]),
  ],
  controllers: [MessagesController],
  providers: [
    // service principal
    MessagesService,
    MessageGateway,
    ConnectionsService,

    // services: messages
    SendMessageService,
    CreateMessageService,
    SpeechToTextService,
    SpeechToTextServiceV2,

    // analise do audio
    SpeechAnalysisCallbackService,
    SpeechAnalysisService,

    AuthorizationService,
    // implementacoes dos repositorios
    { provide: MESSAGE_REPOSITORY_NAME, useClass: MessageMongoRepository },
    {
      provide: AUDIO_ANALYSIS_REPOSITORY_NAME,
      useClass: AudioAnalysisMongoRepository,
    },
  ],
})
export class MessagesModule {}
