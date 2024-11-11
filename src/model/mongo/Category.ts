import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';

@Schema({ collection: `${DATABASE.env ?? 'development'}-category` })
export class Category {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  filter: string[];

  @Prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @Prop({ default: Date.now, type: Date })
  updatedAt?: Date;
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);
