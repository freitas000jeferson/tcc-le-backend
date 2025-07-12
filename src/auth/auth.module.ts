import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelDefinitions } from 'src/model/mongo/model-definitions';

import { ACCESS_TOKEN_REPOSITORY_NAME } from 'src/repository/accessToken/i-access-token.repository';
import { AccessTokenMongoRepository } from 'src/repository/accessToken/implementations/access-token-mongo.repository';
import { USER_REPOSITORY_NAME } from 'src/repository/user/i-user.repository';
import { UserMongoRepository } from 'src/repository/user/implementations/user-mongo.repository';
import { JWT_CONSTANTS } from './constants/jwt-constants';

import { CreateAccessTokenService } from 'src/services/auth/create-access-token.service';
import { LoginService } from 'src/services/auth/login.service';
import {
  UserCreateService,
  UserGetByIdService,
  UserUpdateService,
} from 'src/services/user';

import { PassportModule } from '@nestjs/passport';
import { FindAccessTokenService } from 'src/services/auth/find-access-token.service';
import { LogoutService } from 'src/services/auth/logout.service';
import { RefreshTokenService } from 'src/services/auth/refresh-token.service';
import { SaveTokenService } from 'src/services/auth/save-token.service';
import { ValidateTokenService } from 'src/services/auth/validate-token.service';
import { FindOneUserService } from 'src/services/user/find-one-user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BasicStrategy } from './strategies/basic.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthorizationService } from './providers/authorization.service';
import { ValidateJwtPayloadService } from './providers/validate-jwt-payload.service';
import { ForgotPasswordService } from 'src/services/auth/forgot-password.service';
import { MailService } from 'src/services/mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      ModelDefinitions.AccessToken,
      ModelDefinitions.User,
      ModelDefinitions.Chat,
    ]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: JWT_CONSTANTS().jwt_secret,
        signOptions: {
          expiresIn: '30m',
          algorithm: JWT_CONSTANTS().access_token_algorithm,
        },
      }),
      global: true,
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    // service principal
    AuthService,

    // outros serviços
    AuthorizationService,
    ValidateJwtPayloadService,

    // services: user
    UserCreateService,
    UserGetByIdService,
    UserUpdateService,
    FindOneUserService,

    // services: login
    LoginService,
    CreateAccessTokenService,
    ValidateTokenService,
    RefreshTokenService,
    SaveTokenService,
    FindAccessTokenService,
    LogoutService,
    // services: forgot password
    ForgotPasswordService,
    MailService,

    // services: jwt
    JwtStrategy,
    // services: basic
    BasicStrategy,

    // implementacoes dos repositorios
    { provide: USER_REPOSITORY_NAME, useClass: UserMongoRepository },
    {
      provide: ACCESS_TOKEN_REPOSITORY_NAME,
      useClass: AccessTokenMongoRepository,
    },
  ],
  exports: [
    AuthService,
    AuthorizationService,
    UserCreateService,
    UserGetByIdService,
    FindOneUserService,
    LoginService,
    CreateAccessTokenService,
    ValidateTokenService,
    RefreshTokenService,
    SaveTokenService,
    FindAccessTokenService,
  ],
})
export class AuthModule {}
