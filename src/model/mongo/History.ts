import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';
import { Category } from './Category';
import { Grammar } from './Grammar';
import { Question } from './Question';
import { Vocabulary } from './Vocabulary';

type HistoryType = 'VOCABULARY' | 'GRAMMAR' | 'QUESTION';

@Schema({ collection: `${DATABASE.env ?? 'development'}-history` })
export class History {
  @Prop()
  type: HistoryType;

  @Prop()
  nextVisited: number;

  @Prop()
  nextVisitedId: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  categoryId: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grammar',
  })
  grammarId?: Grammar;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vocabulary',
  })
  vocabularyId?: Vocabulary;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  })
  questionId?: Question;

  @Prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @Prop({ default: Date.now, type: Date })
  updatedAt?: Date;
}

export type HistoryDocument = History & Document;

export const HistorySchema = SchemaFactory.createForClass(History);
