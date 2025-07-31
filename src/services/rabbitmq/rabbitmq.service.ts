import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;
  private readonly url: string;
  private readonly logger = new Logger(RabbitmqService.name);

  constructor(private readonly configService: ConfigService) {
    this.url = this.configService.get<string>('RABBITMQ_URL');
  }
  async onModuleInit() {
    await this.connect();
  }
  private async connect(): Promise<void> {
    try {
      this.connection = await connect(this.url);
      this.channel = await this.connection.createChannel();
      this.logger.log('RabbitMQ connected and channel created');
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error);
      throw error;
    }
  }

  async publish(queue: string, message: any): Promise<void> {
    if (!this.channel) {
      this.logger.warn('Channel not initialized, trying to reconnect...');
      await this.connect();
    }

    await this.channel.assertQueue(queue, { durable: true });
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.sendToQueue(queue, buffer, { persistent: true });

    this.logger.log(
      `Message published to "${queue}": ${JSON.stringify(message)}`
    );
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
    this.logger.log('RabbitMQ connection closed');
  }
}
