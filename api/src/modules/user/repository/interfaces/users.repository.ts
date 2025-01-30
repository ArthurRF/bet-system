import { User } from '@modules/event/infra/typeorm/entities/user.entity';

export type IUsersRepository = {
  findByUsername(username: string): Promise<User | null>;
  create(username: string, password: string): Promise<User>;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
  generateToken(userId: string): string;
};
