export class UserEntity {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  password?: string;
  level?: number;
  score?: number;
  isActive?: boolean;
  passwordResetToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
