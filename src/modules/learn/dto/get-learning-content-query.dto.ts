import { IsOptional, IsString } from 'class-validator';

export class GetLearningContentQueryDto {
  @IsOptional()
  @IsString()
  userId?: string;
  @IsString()
  category: string;
}
