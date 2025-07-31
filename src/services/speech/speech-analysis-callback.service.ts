import { Inject, Injectable, Logger } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import {
  AUDIO_ANALYSIS_REPOSITORY_NAME,
  IAudioAnalysisRepository,
} from 'src/repository/audioAnalysis/i-audio-analysis.repository';
import { MessageGateway } from 'src/modules/messages/message.gateway';
import { AudioAnalysisCallbackDto } from 'src/modules/messages/dto/audio-analysis-callback.dto';

@Injectable()
export class SpeechAnalysisCallbackService {
  private readonly logger = new Logger(SpeechAnalysisCallbackService.name);

  constructor(
    @Inject(AUDIO_ANALYSIS_REPOSITORY_NAME)
    private audioAnalysisRepository: IAudioAnalysisRepository,
    private readonly messageGateway: MessageGateway
  ) {}

  async handle(dto: AudioAnalysisCallbackDto) {
    const audioData = await this.audioAnalysisRepository.findById(dto.orderId);

    if (!audioData) {
      this.logger.log(`🔴 Audio not found: ${dto}`);
      return;
    }
    audioData.transcription = dto.transcription;
    audioData.similarity = dto.similarity;
    audioData.updatedAt = new Date();

    await audioData.save();

    this.logger.log(`SpeechAnalysisCallback : ${dto.userId} ${dto}`);
    this.messageGateway.emitToUser(dto.userId, 'result-similarity', {
      transcription: dto.transcription,
      similarity: dto.similarity,
      orderId: dto.orderId,
    });
    return { success: status };
  }
}
