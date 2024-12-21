import { IsString } from 'class-validator';

export class CreateQuestionsDto {
  @IsString()
  userId: string;
  @IsString()
  category: string;
}
