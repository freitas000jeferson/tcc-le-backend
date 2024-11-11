import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';
import { User } from './User';

@Schema({ collection: `${DATABASE.env ?? 'development'}-access-token` })
export class AccessToken {
  @Prop()
  expired: boolean;

  @Prop()
  passwordResetToken?: string;

  @Prop()
  accessToken?: string;

  @Prop()
  refreshToken?: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;

  @Prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @Prop({ default: Date.now, type: Date })
  updatedAt?: Date;
}

export type AccessTokenDocument = AccessToken & Document;

export const AccessTokenSchema = SchemaFactory.createForClass(AccessToken);
