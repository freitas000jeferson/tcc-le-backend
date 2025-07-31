import { AudioAnalysis } from 'src/model/mongo';

export class AudioFactory {
  static saveAudio(userId: any, text: string) {
    const response = new AudioAnalysis();
    response.userId = userId;
    response.baseText = text;

    return response;
  }
}
