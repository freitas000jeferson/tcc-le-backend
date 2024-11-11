import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';
import { Category } from './Category';
import { Option, Question } from './Question';

export enum QuestionStatus {
  RIGTH = 'RIGTH',
  WRONG = 'WRONG',
  TO_DO = 'TO_DO',
}

export enum QuestionnarieStatus {
  TO_DO = 'TO_DO',
  DOING = 'DOING',
  DONE = 'DONE',
}

export class QuestionData
  implements Omit<Question, 'level' | 'createdAt' | 'updatedAt'>
{
  @Prop()
  id?: string;

  @Prop()
  text?: string[];

  @Prop()
  image?: string;

  @Prop({ type: () => [Option] })
  options?: Option[];

  @Prop()
  answer: string;

  @Prop()
  answerId?: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  categoryId: Category;

  // Resposta
  @Prop()
  answered?: string;

  @Prop()
  answeredId?: number;

  @Prop()
  status: QuestionStatus;
}

@Schema({ collection: `${DATABASE.env ?? 'development'}-questionnaries` })
export class Questionnarie {
  @Prop({
    type: String,
    enum: QuestionnarieStatus,
    default: QuestionnarieStatus.TO_DO,
  })
  status: QuestionnarieStatus;

  @Prop({ type: () => [QuestionData] })
  questions: QuestionData[];

  @Prop()
  totalQuestions: number;

  @Prop()
  totalCorrectAnswers: number;

  @Prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @Prop({ default: Date.now, type: Date })
  updatedAt?: Date;
}

export type QuestionnarieDocument = Questionnarie & Document;

export const QuestionnarieSchema = SchemaFactory.createForClass(Questionnarie);
