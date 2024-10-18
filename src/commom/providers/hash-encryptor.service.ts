import * as bcrypt from 'bcrypt';

export class HashEncryptorService {
  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 8);
  }

  static async comparePassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
  //   static generateToken (payload, options) => jwt.issue(payload, options);
}
