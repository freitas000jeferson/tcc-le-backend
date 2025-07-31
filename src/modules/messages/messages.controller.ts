import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User, UserType } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AudioAnalysisDto } from './dto/audio-analysis.dto';
import { AudioAnalysisCallbackDto } from './dto/audio-analysis-callback.dto';

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

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post('analysis-audio/upload')
  @UseInterceptors(FileInterceptor('file'))
  async analysisAudio(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 250000 }),
          new FileTypeValidator({ fileType: 'audio/mpeg' }),
        ],
      })
      // new FileSizeValidationPipe()
    )
    file: Express.Multer.File,
    @User() user: UserType,
    @Body() dto: AudioAnalysisDto
  ) {
    return await this.messagesService.analysisAudio(user, file, dto);
  }

  @Post('analysis-audio/callback')
  async analysisAudioCallback(@Body() dto: AudioAnalysisCallbackDto) {
    return await this.messagesService.analysisAudioCallback(dto);
  }
}
