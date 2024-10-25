import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        baseURL: config.get<string>('RASA_URL'),
      }),
    }),
    CacheModule.register(),
  ],
  controllers: [],
  providers: [],
  exports: [HttpModule],
})
export class ChatbotHttpModule implements OnModuleInit {
  async onModuleInit() {
    // TODO: implementar interceptors
  }
}
