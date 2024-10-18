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

import { FindAccessTokenService } from 'src/services/auth/find-access-token.service';
import { LogoutService } from 'src/services/auth/logout.service';
import { RefreshTokenService } from 'src/services/auth/refresh-token.service';
import { SaveTokenService } from 'src/services/auth/save-token.service';
import { ValidateTokenService } from 'src/services/auth/validate-token.service';
import { FindOneUserService } from 'src/services/user/find-one-user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      ModelDefinitions.AccessToken,
      ModelDefinitions.User,
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
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserCreateService,
    UserGetByIdService,
    UserUpdateService,
    FindOneUserService,

    LoginService,
    CreateAccessTokenService,
    ValidateTokenService,
    RefreshTokenService,
    SaveTokenService,
    FindAccessTokenService,
    LogoutService,

    JwtStrategy,

    { provide: USER_REPOSITORY_NAME, useClass: UserMongoRepository },
    {
      provide: ACCESS_TOKEN_REPOSITORY_NAME,
      useClass: AccessTokenMongoRepository,
    },
  ],
  exports: [
    AuthService,
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
