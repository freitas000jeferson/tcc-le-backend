import { IsString } from 'class-validator';

export class GetLearningContentQueryDto {
  @IsString()
  userId: string;
  @IsString()
  category: string;
}
