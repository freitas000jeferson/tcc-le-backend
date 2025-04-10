import { IsOptional, IsString } from 'class-validator';

export class GetCurrentQuestionQueryDto {
  @IsString()
  @IsOptional()
  questionId?: string;
  @IsString()
  @IsOptional()
  userId?: string;
}
