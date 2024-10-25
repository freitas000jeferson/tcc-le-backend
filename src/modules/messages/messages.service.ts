import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserType } from 'src/auth/decorators/user.decorator';
import { CreateMessageService } from 'src/services/message/create-message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    private readonly createMessageService: CreateMessageService,
    private readonly configService: ConfigService
  ) {}

  async sendMessage(user: UserType, createMessageDto: CreateMessageDto) {
    return await this.createMessageService.handle({
      userId: user.userId,
      message: createMessageDto.message,
    });
  }
}
