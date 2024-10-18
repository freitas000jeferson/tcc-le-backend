import bs58 from 'bs58';
import {
  CipherGCMTypes,
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from 'crypto';

export type CipherivOptions = {
  iv?: Buffer;
  key: Buffer;
  algorithm?: CipherGCMTypes;
  useTag?: boolean;
};
const IV_SIZE = 16;
const TAG_SIZE = 16;
const TAG_START = 0;

export class CipherivEncryptorService {
  private readonly iv: Buffer;
  private readonly salt: Buffer;
  private readonly key: Buffer;
  private readonly algorithm: CipherGCMTypes;
  private readonly useTag: boolean;

  constructor(options: CipherivOptions) {
    this.key = options.key;
    this.iv = options.iv || randomBytes(IV_SIZE);
    this.algorithm = options.algorithm || 'aes-256-gcm';
    this.useTag = options.useTag || false;
  }

  public encrypt(data: string): string {
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);

    let encrypted = Buffer.concat([
      cipher.update(data, 'utf-8'),
      cipher.final(),
    ]);

    if (this.useTag) {
      const tag = cipher.getAuthTag();
      encrypted = Buffer.concat([tag, encrypted]);
    }

    return bs58.encode(encrypted);
  }

  public decrypt(data: string): string {
    const decipher = createDecipheriv(this.algorithm, this.key, this.iv);

    const bufferData = bs58.decode(data);
    let text = bufferData;

    if (this.useTag) {
      text = bufferData.slice(TAG_SIZE + TAG_START);

      const tag = bufferData.slice(TAG_START, TAG_SIZE + TAG_START);
      decipher.setAuthTag(tag);
    }

    const decrypted: string = decipher.update(text) + decipher.final('utf-8');
    return decrypted;
  }
}
