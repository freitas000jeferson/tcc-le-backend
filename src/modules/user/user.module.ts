import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ModelDefinitions } from 'src/model/mongo/model-definitions';
import { USER_REPOSITORY_NAME } from 'src/repository/user/i-user.repository';
import { UserMongoRepository } from 'src/repository/user/implementations/user-mongo.repository';
import {
  UserCreateService,
  UserGetAllService,
  UserGetByIdService,
} from 'src/services/user';

import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      ModelDefinitions.AccessToken,
      ModelDefinitions.User,
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserGetAllService,
    UserCreateService,
    UserGetByIdService,

    { provide: USER_REPOSITORY_NAME, useClass: UserMongoRepository },
  ],
})
export class UserModule {}
