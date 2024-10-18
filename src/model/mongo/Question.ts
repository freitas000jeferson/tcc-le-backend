import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';
import { Category } from './Category';

export interface Option {
  id: number;
  text: string;
}

@Schema({ collection: `${DATABASE.env ?? 'development'}-questions` })
export class Question {
  @Prop()
  text: string[];

  @Prop()
  image?: string;

  @Prop()
  options: Option[];

  @Prop()
  answer: string;

  @Prop()
  answerId: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  categoryId: Category;

  @Prop()
  level: number;

  @Prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @Prop({ default: Date.now, type: Date })
  updateAt?: Date;
}

export type QuestionDocument = Question & Document;

export const QuestionSchema = SchemaFactory.createForClass(Question);
