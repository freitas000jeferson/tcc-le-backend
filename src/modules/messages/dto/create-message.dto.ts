import { IsOptional, IsString, IsObject, IsDateString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsDateString()
  userDate?: Date;
}
