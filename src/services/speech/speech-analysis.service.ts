import { Inject, Injectable, Logger } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import {
  AUDIO_ANALYSIS_REPOSITORY_NAME,
  IAudioAnalysisRepository,
} from 'src/repository/audioAnalysis/i-audio-analysis.repository';
import { AudioFactory } from './audio-factory';

@Injectable()
export class SpeechAnalysisService {
  private readonly queueName: string = 'calculate_similarity_queue';
  private readonly logger = new Logger(SpeechAnalysisService.name);

  constructor(
    @Inject(AUDIO_ANALYSIS_REPOSITORY_NAME)
    private audioAnalysisRepository: IAudioAnalysisRepository,
    private readonly rabbitmqService: RabbitmqService
  ) {}

  async handle(userId: string, file: Express.Multer.File, text: string) {
    const audioData = await this.audioAnalysisRepository.create(
      AudioFactory.saveAudio(userId, text)
    );

    const json = {
      userId: userId,
      name: file.originalname,
      file: file.buffer.toString('base64'),
      baseText: text,
      orderId: audioData._id,
    };

    const status = await this.rabbitmqService.publish(this.queueName, json);
    this.logger.log(`Envio para analise: ${status}`);

    return { success: status };
  }
}
