import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User, UserType } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller({ path: 'messages', version: '1' })
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
