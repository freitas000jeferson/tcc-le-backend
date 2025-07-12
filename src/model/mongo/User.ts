import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';

@Schema({ collection: `${DATABASE.env ?? 'development'}-users` })
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  avatar?: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  level?: number;

  @Prop()
  score?: number;

  @Prop()
  isActive?: boolean;

  @Prop({ select: false })
  resetCode?: string;

  @Prop({ select: false })
  resetCodeExpires?: Date;

  @Prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @Prop({ default: Date.now, type: Date })
  updatedAt?: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
