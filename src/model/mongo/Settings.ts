import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DATABASE } from 'src/commom/constants';

@Schema({ collection: `${DATABASE.env ?? 'development'}-settings` })
export class Settings {
  @Prop()
  timeForNextVisit: number[];

  @Prop({ default: Date.now, type: Date })
  createdAt?: Date;

  @Prop({ default: Date.now, type: Date })
  updatedAt?: Date;
}

export type SettingsDocument = Settings & Document;

export const SettingsSchema = SchemaFactory.createForClass(Settings);
