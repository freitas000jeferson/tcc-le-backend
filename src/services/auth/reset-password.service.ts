import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';
import { HashEncryptorService } from 'src/commom/providers/hash-encryptor.service';
import { UserDocument } from 'src/model/mongo';

import {
  IUserRepository,
  USER_REPOSITORY_NAME,
} from 'src/repository/user/i-user.repository';

@Injectable()
export class ResetPasswordService {
  constructor(
    @Inject(USER_REPOSITORY_NAME)
    private userRepository: IUserRepository
  ) {}

  async handle({ email, code, password, validationCode }: ResetPasswordDto) {
    const user: UserDocument = await this.userRepository.findOne({
      email,
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    if (
      user.resetCode !== code ||
      user.validationCode !== validationCode ||
      user.resetCodeExpires > new Date()
    ) {
      throw new BadRequestException('Código inválido ou expirado');
    }
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    user.validationCode = undefined;
    user.password = await HashEncryptorService.hashPassword(password);
    user.save();

    return { data: { message: 'Senha redefinida com sucesso' } };
  }
}
