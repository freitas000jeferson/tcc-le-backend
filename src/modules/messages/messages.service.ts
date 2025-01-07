import { HttpStatus, Injectable } from '@nestjs/common';
import { UserType } from 'src/auth/decorators/user.decorator';
import { CreateMessageService } from 'src/services/message/create-message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Response } from 'express';
import { SpeechToTextService } from 'src/services/rabbitmq/speech-to-text.service';
import { SpeechToTextServiceV2 } from 'src/services/transcription/speech-to-text.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly createMessageService: CreateMessageService,
    private readonly speechToTextService: SpeechToTextService,
    private readonly sttV2: SpeechToTextServiceV2
  ) {}

  async sendMessage(user: UserType, createMessageDto: CreateMessageDto) {
    return await this.createMessageService.handle({
      userId: user.userId,
      message: createMessageDto.message,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    // return await this.sttV2.handle(file);
    return await this.speechToTextService.handle(file, 'user-id-0000');
  }
}
