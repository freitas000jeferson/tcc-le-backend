import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';
import { User } from './User';

export class Button {
  @Prop({ required: true })
  id: number;
  @Prop({ required: true })
  title: string;
  @Prop()
  payload?: string;
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

  @Prop({ type: () => [Button] })
  buttonsBody?: Button[];

  @Prop({ default: Date.now, type: Date })
  date?: Date;
}

export type MessageDocument = Message & Document;

export const MessageSchema = SchemaFactory.createForClass(Message);
