import { IsString } from 'class-validator';

export class ValidateQuestionDto {
  @IsString()
  answer: string;
}
