import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';
import { Chat } from './Chat';

export interface Button {
  id: number;
  title: string;
  payload?: string;
}

@Schema({ collection: `${DATABASE.env ?? 'development'}-message` })
export class Message {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  })
  chatId: Chat;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  textBody: string;

  @Prop()
  imageBody: string;

  @Prop()
  buttonsBody?: Button;

  @Prop({ default: Date.now, type: Date })
  date?: Date;
}

export type MessageDocument = Message & Document;

export const MessageSchema = SchemaFactory.createForClass(Message);
