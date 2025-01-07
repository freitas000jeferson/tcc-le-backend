import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { writeFileSync, createReadStream, unlinkSync } from 'fs';
import OpenAI, { toFile } from 'openai';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SpeechToTextServiceV2 {
  private openai: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      // organization: 'org-KlUn1hIhkmyiSkP70PFX7vpS',
      // project: 'proj_QZoZEWZtfpQMGJsVJIcRYzne',
    });
  }

  async handle(data: Express.Multer.File) {
    // try {
    // const name = `./${uuidv4()}-file-${data.originalname}`;
    // // cria arquivo
    // await writeFileSync(name, data.buffer);

    const transcription = await this.openai.audio.transcriptions.create({
      file: await toFile(data.buffer, 'audio.mp3', {
        type: 'audio/mp3',
      }),
      model: 'whisper-1',
    });

    // deleta arquivo
    // await unlinkSync(name);
    console.log(transcription.text);
    return transcription;
    // } catch (error) {
    //   throw new InternalServerErrorException(
    //     error,
    //     'NAO FOI POSSIVEL FAZER TRADUCAO VOZ PARA TEXTO'
    //   );
    // }
  }
}
