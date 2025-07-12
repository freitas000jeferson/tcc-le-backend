import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Token } from './decorators/token.decorator';
import { User, UserType } from './decorators/user.decorator';
import { ResetPasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthGuard } from './guards/auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ValidateCodeAndEmailDto } from './dto/validate-code-and-email.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    //'Cria novo usuário';
    return await this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    //'Faz Login (gera token e refresh)';
    return await this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post('logout')
  async logout(@User() user: UserType, @Token() token: string) {
    //'Faz saida do usuario (remocao dos tokens e sessão)';
    return await this.authService.logout(user, token);
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get('profile')
  async profile(@User() user: UserType) {
    //'Retorna usuário logado (pega pelo user da req)';
    return await this.authService.profile(user);
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    //'Atualiza token e novo refresh';
    return await this.authService.refreshToken(dto);
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Get('validate-token/:token')
  async validateToken(@Param('token') token: string) {
    //'Verifica se o token ainda é válido';
    return await this.authService.validateToken(token);
  }

  @UseGuards(JwtAuthGuard, AuthGuard)
  @Put('change-password')
  async changePassword(@Body() dto: ResetPasswordDto, @User() user: UserType) {
    //'Altera senha Logado';
    return await this.authService.changePassword(dto, user);
  }
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    //'Envia email para alteração de senha(deve conter codigo para validacao)';
    return await this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    //'Faz o reset de senha';
    return await this.authService.resetPassword(dto);
  }
}
