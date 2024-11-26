import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';
import { Category } from './Category';

@Schema({ collection: `${DATABASE.env ?? 'development'}-grammar` })
export class Grammar {
  @Prop()
  text: string[];

  @Prop()
  images: string[];

  @Prop()
  examples: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  categoryId: Category;

  @Prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @Prop({ default: Date.now, type: Date })
  updatedAt?: Date;
}

export type GrammarDocument = Grammar & Document;

export const GrammarSchema = SchemaFactory.createForClass(Grammar);
