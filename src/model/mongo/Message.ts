import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';
import { User } from './User';
import { CustomMetadataResponse } from 'src/services/message/types';
import { QuestionnarieStatus, QuestionStatus } from './Questionnarie';
import { QuestionResponseDto } from 'src/modules/learn/dto/question-response.dto';

export class Button {
  @Prop({ required: true })
  id: number;
  @Prop({ required: true })
  title: string;
  @Prop()
  payload?: string;
}
export class Metadata implements CustomMetadataResponse {
  id?: string;
  status?: QuestionnarieStatus;
  lastQuestionStatus?: QuestionStatus;
  totalQuestions?: number;
  totalCorrectAnswers?: number;
  question?: QuestionResponseDto;
  text?: string[];
  images?: string[];
  examples?: string[];
}

@Schema({ collection: `${DATABASE.env ?? 'development'}-message` })
export class Message {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  textBody?: string;

  @Prop()
  imageBody?: string;

  @Prop({ type: () => Metadata })
  metadata?: Metadata;

  @Prop({ type: () => [Button] })
  buttonsBody?: Button[];

  @Prop({ default: Date.now, type: Date })
  date?: Date;

  @Prop({ default: Date.now, type: Date })
  userDate?: Date;
}

export type MessageDocument = Message & Document;

export const MessageSchema = SchemaFactory.createForClass(Message);
