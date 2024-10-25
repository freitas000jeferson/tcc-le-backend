import { Button, User } from 'src/model/mongo';

export class MessageEntity {
  userId: User | string;
  from: string;
  to: string;
  textBody: string;
  imageBody: string;
  buttonsBody?: Button;
  date?: Date;
}
