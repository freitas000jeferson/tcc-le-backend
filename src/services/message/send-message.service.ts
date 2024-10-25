import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { MessageFactory } from './message-factory';
import { SendMessageServiceDto } from './types';

@Injectable()
export class SendMessageService {
  constructor(private readonly httpService: HttpService) {}

  async handle(dto: SendMessageServiceDto) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post('', MessageFactory.sendMessage(dto)).pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          })
        )
      );
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error, 'REQUEST SERVER RASA');
    }
  }
}
