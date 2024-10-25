import { User } from 'src/model/mongo';

export enum Sender {
  me = 'me',
  bot = 'bot',
}

export interface SendMessageServiceDto {
  userId: User | string;
  message: string;
}
export interface ChatbotMessageRequestDto {
  sender: string;
  message: string;
  metadata?: Record<string, any>;
}
export interface ChatbotMessageResponseDto {
  //  TODO: implementar response do rasa
  metadata?: Record<string, any>;
}
