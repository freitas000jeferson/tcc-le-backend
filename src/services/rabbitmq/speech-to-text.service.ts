import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { IAmqpConnectionManager } from 'amqp-connection-manager/dist/types/AmqpConnectionManager';
import { Channel } from 'amqplib';

@Injectable()
export class SpeechToTextService {
  private channelWrapper: ChannelWrapper;
  private queueName = 'test_queue';
  private connection: IAmqpConnectionManager;
  constructor() {
    this.connect();
  }
  private connect() {
    this.connection = amqp.connect(['amqp://localhost']);
    this.channelWrapper = this.connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(this.queueName, { durable: true });
      },
    });
  }
  private disconnect() {
    this.connection.close();
  }

  async handle(file: Express.Multer.File, userId: string) {
    const json = {
      userId: userId,
      name: file.originalname,
      file: file.buffer.toString('base64'),
    };
    const status = await this.channelWrapper.sendToQueue(
      this.queueName,
      Buffer.from(JSON.stringify(json)),
      {
        persistent: true,
      }
    );

    return { success: status };
  }
}
