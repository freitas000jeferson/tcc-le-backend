import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/commom/repository/mongo/mongo-generic.repository';
import { AudioAnalysis, AudioAnalysisDocument } from 'src/model/mongo';
import { IAudioAnalysisRepository } from '../i-audio-analysis.repository';

export class AudioAnalysisMongoRepository
  extends MongoGenericRepository<AudioAnalysisDocument>
  implements IAudioAnalysisRepository
{
  constructor(
    @InjectModel(AudioAnalysis.name)
    private model: Model<AudioAnalysisDocument>
  ) {
    super(model);
  }
}
