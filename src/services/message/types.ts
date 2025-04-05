import { QuestionnarieStatus, QuestionStatus, User } from 'src/model/mongo';
import { GrammarResponseDto } from 'src/modules/learn/dto/get-learning-content-response.dto';
import {
  QuestionnarieResponseDto,
  QuestionResponseDto,
} from 'src/modules/learn/dto/question-response.dto';

export enum Sender {
  me = 'me',
  bot = 'bot',
}

export interface SendMessageServiceDto {
  userId: User | string;
  message: string;
  userDate?: Date;
}
export interface ChatbotMessageRequestDto {
  sender: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface CustomMetadataResponse
  extends Partial<QuestionnarieResponseDto>,
    Partial<GrammarResponseDto> {}
export interface ChatbotMessageResponseDto {
  //  TODO: implementar response do rasa
  recipient_id: string;
  text?: string;
  image?: string;
  buttons?: { payload: string; title: string }[];
  custom?: CustomMetadataResponse;
}
