import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import OpenAI from 'openai';
import path from 'path';

@Injectable()
export class TextToSpeechService {
  private openai: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async handle(data: string) {
    const mp3 = await this.openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: data,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile('./speech.mp3', buffer);
    return data;
  }
}
