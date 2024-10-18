import { InvalidPasswordException } from 'src/commom/exceptions';
import { HashEncryptorService } from 'src/commom/providers/hash-encryptor.service';

export class VerifyPasswordService {
  static async handle(password: string, hashedPassword: string) {
    const isPasswordMatching = await HashEncryptorService.comparePassword(
      password,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new InvalidPasswordException();
    }
    return isPasswordMatching;
  }
}
