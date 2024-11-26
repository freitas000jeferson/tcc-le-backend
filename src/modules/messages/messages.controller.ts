import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User, UserType } from 'src/auth/decorators/user.decorator';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @User() user: UserType,
    @Body() createMessageDto: CreateMessageDto
  ) {
    return await this.messagesService.sendMessage(user, createMessageDto);
  }
}
