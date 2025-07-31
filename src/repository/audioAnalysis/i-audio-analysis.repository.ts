import { FilterQuery } from 'mongoose';
import { AudioAnalysis, AudioAnalysisDocument } from 'src/model/mongo';

export interface IAudioAnalysisRepository {
  findOne(
    query: FilterQuery<AudioAnalysisDocument>
  ): Promise<AudioAnalysisDocument>;

  findById(id: string): Promise<AudioAnalysisDocument>;

  create(data: AudioAnalysis): Promise<AudioAnalysisDocument>;

  update(
    filter: FilterQuery<AudioAnalysisDocument>,
    data: AudioAnalysis
  ): Promise<AudioAnalysisDocument>;

  delete(id: string): Promise<void>;
}
export const AUDIO_ANALYSIS_REPOSITORY_NAME = 'IAudioAnalysisRepository';
