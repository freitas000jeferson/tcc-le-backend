import { Button, Metadata, User } from 'src/model/mongo';

export class MessageEntity {
  id?: any;
  userId: User | string;
  from: string;
  to: string;
  textBody?: string;
  imageBody?: string;
  metadata?: Metadata;
  buttonsBody?: Button[];
  date?: Date;
  userDate?: Date;
}
