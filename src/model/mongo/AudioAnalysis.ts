import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';
import { User } from './User';

@Schema({ collection: `${DATABASE.env ?? 'development'}-access-token` })
export class AudioAnalysis {
  @Prop()
  baseText: string;

  @Prop()
  transcription?: string;

  @Prop()
  similarity?: any;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;

  @Prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @Prop({ default: Date.now, type: Date })
  updatedAt?: Date;
}

export type AudioAnalysisDocument = AudioAnalysis & Document;

export const AudioAnalysisSchema = SchemaFactory.createForClass(AudioAnalysis);
