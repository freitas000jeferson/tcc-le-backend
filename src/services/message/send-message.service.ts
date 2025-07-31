import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { MessageFactory } from './message-factory';
import { ChatbotMessageResponseDto, SendMessageServiceDto } from './types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendMessageService {
  private readonly url: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.url = this.configService.get<string>('RASA_URL');
  }

  async handle(dto: SendMessageServiceDto) {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .post<ChatbotMessageResponseDto[]>(
            this.url,
            MessageFactory.sendMessage(dto)
          )
          .pipe(
            catchError((error: AxiosError) => {
              console.error(error.response.data);
              throw 'An error happened!';
            })
          )
      );
      return data;
    } catch (error) {
      console.error('ERROR send message to rasa', error);
      throw new InternalServerErrorException(error, 'REQUEST SERVER RASA');
    }
  }
}
