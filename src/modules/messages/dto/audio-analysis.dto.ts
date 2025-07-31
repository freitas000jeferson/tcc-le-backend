import { IsString } from 'class-validator';

export class AudioAnalysisDto {
  @IsString()
  text: string;
}
