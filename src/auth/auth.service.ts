import { Injectable } from '@nestjs/common';
import { ApiDefaultResponse } from 'src/commom/dtos/api-default-response.dto';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { LoginService } from 'src/services/auth/login.service';
import { LogoutService } from 'src/services/auth/logout.service';
import { RefreshTokenService } from 'src/services/auth/refresh-token.service';
import { ValidateTokenService } from 'src/services/auth/validate-token.service';
import {
  UserCreateService,
  UserGetByIdService,
  UserUpdateService,
} from 'src/services/user';
import { UserType } from './decorators/user.decorator';
import { ResetPasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userCreateService: UserCreateService,
    private readonly loginService: LoginService,
    private readonly validateTokenService: ValidateTokenService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly userGetByIdService: UserGetByIdService,
    private readonly logoutService: LogoutService,
    private readonly userUpdateService: UserUpdateService
  ) {}

  async register(dto: CreateUserDto) {
    const response = await this.userCreateService.handle(dto);

    return new ApiDefaultResponse(response);
  }

  async login(dto: LoginDto) {
    return await this.loginService.handle(dto);
  }

  async logout(user: UserType, token: string) {
    return await this.logoutService.handle(user.userId, token);
  }

  async profile(user: UserType) {
    return await this.userGetByIdService.handle(user.userId);
  }

  async refreshToken(dto: RefreshTokenDto) {
    return await this.refreshTokenService.handle(dto);
  }

  async validateToken(token: string) {
    return await this.validateTokenService.handle(token);
  }

  async changePassword(dto: ResetPasswordDto, user: UserType) {
    return await this.userUpdateService.handle(user, {
      password: dto.password,
    });
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    return 'Envia email para alteração de senha(deve conter codigo para validacao)';
  }

  async resetPasswordValidate(code: string) {
    return 'Valida o code para realizar o reset de senha ';
  }

  async resetPassword(code: string, dto: ResetPasswordDto) {
    return 'Faz o reset de senha';
  }
}
