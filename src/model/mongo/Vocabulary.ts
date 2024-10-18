import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';
import { Category } from './Category';

@Schema({ collection: `${DATABASE.env ?? 'development'}-vocabulary` })
export class Vocabulary {
  // vocabulario e expressoes
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
  updateAt?: Date;
}

export type VocabularyDocument = Vocabulary & Document;

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);
