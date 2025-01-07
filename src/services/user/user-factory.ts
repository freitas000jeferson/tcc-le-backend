import { UserEntity } from 'src/entities/User.entity';
import { User, UserDocument } from 'src/model/mongo';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { GetUserResponseDto } from 'src/modules/user/dto/get-user-response.dto';

export class UserFactory {
  static createUser(data: CreateUserDto) {
    const user: User = new User();
    const datenow = new Date();
    user.username = data.username;
    user.email = data.email;
    user.avatar = data.avatar;
    user.password = data.password;
    user.level = 1;
    user.isActive = true;
    user.passwordResetToken = undefined;
    user.createdAt = datenow;
    user.updatedAt = datenow;

    return user;
  }
  static updateUser(user: User, data: Partial<User>): User {
    return Object.assign(user, data);
  }

  static getAllUser(data: UserDocument[]): GetUserResponseDto[] {
    return data.map((item) => this.getUser(item));
  }

  static getUser(data: UserDocument): GetUserResponseDto {
    const user = new GetUserResponseDto();
    user.id = data.id;
    user.email = data.email;
    user.username = data.username;
    user.avatar = data.avatar;
    user.level = data.level;

    return user;
  }
  static parseUser(data: UserDocument): UserEntity {
    const user = new UserEntity();
    user.id = data.id;
    user.email = data.email;
    user.username = data.username;
    user.avatar = data.avatar;
    user.level = data.level;

    return user;
  }
}
