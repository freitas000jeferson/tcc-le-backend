import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ValidateQuestionDto {
  @IsString()
  questionId: string;

  @IsString()
  answer: string;

  @IsOptional()
  @IsNumber()
  answerId?: number;
}
