import { IsOptional, IsString, IsObject } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  message: string;
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
