export class UserEntity {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  password?: string;
  level?: number;
  score?: number;
  isActive?: boolean;
  validationCode?: string;
  resetCode?: string;
  resetCodeExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
