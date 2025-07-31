import { IsNumber, IsString } from 'class-validator';

export class AudioAnalysisCallbackDto {
  @IsString()
  orderId: string;
  @IsString()
  userId: string;
  @IsNumber()
  similarity: number;
  @IsString()
  transcription: string;
}
