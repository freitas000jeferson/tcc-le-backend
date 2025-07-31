import { Injectable } from '@nestjs/common';
import { UserType } from 'src/auth/decorators/user.decorator';
import { CreateMessageService } from 'src/services/message/create-message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AudioAnalysisDto } from './dto/audio-analysis.dto';
import { SpeechToTextService } from 'src/services/speech/speech-to-text.service';
import { SpeechAnalysisService } from 'src/services/speech/speech-analysis.service';
import { AudioAnalysisCallbackDto } from './dto/audio-analysis-callback.dto';
import { SpeechAnalysisCallbackService } from 'src/services/speech/speech-analysis-callback.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly createMessageService: CreateMessageService,
    private readonly speechToTextService: SpeechToTextService,
    private readonly speechAnalysisService: SpeechAnalysisService,
    private readonly speechAnalysisCallbackService: SpeechAnalysisCallbackService
  ) {}

  async sendMessage(user: UserType, createMessageDto: CreateMessageDto) {
    return await this.createMessageService.handle({
      userId: user.userId,
      message: createMessageDto.message,
    });
  }

  async uploadFile(user: UserType, file: Express.Multer.File) {
    // return await this.sttV2.handle(file);
    return await this.speechToTextService.handle(file, user.userId);
  }
  async analysisAudio(
    user: UserType,
    file: Express.Multer.File,
    dto: AudioAnalysisDto
  ) {
    return await this.speechAnalysisService.handle(user.userId, file, dto.text);
  }

  async analysisAudioCallback(dto: AudioAnalysisCallbackDto) {
    return await this.speechAnalysisCallbackService.handle(dto);
  }
}
