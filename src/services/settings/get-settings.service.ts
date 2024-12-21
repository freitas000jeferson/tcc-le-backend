import { Injectable } from '@nestjs/common';
import { SettingsEntity } from 'src/entities/Settings.entity';

@Injectable()
export class GetSettingsService {
  async handle() {
    const mockData: SettingsEntity = {
      timeForNextVisit: [
        1, 1, 2, 3, 3, 5, 8, 13, 8, 13, 5, 8, 13, 21, 8, 13, 21,
      ],
      scoreForNext: [],
    };
    return mockData;
  }
}
