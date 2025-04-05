import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User, UserType } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from 'src/commom/pipes/file-size-validation.pipe';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller({ path: 'messages', version: '1' })
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post()
  async create(
    @User() user: UserType,
    @Body() createMessageDto: CreateMessageDto
  ) {
    console.log(user, createMessageDto);
    return await this.messagesService.sendMessage(user, createMessageDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 250000 }),
          new FileTypeValidator({ fileType: 'audio/mpeg' }),
        ],
      })
      // new FileSizeValidationPipe()
    )
    file: Express.Multer.File
  ) {
    return await this.messagesService.uploadFile(file);
  }
}
