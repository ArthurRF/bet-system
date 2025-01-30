import { User } from '@modules/event/infra/typeorm/entities/user.entity';
import { DatabaseDataSource } from '@shared/infra/typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { IUsersRepository } from './interfaces/users.repository';

// This secret can be moved to an secret manager service
// but it's mocked for this example
const JWT_SECRET = 'bet-system-secret';
const JWT_EXPIRATION = '12h';

@Service()
export class UsersRepository implements IUsersRepository {
  constructor(private dbConnection = DatabaseDataSource) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.dbConnection.manager.findOne(User, {
      where: { username },
    });
  }

  async create(username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    return this.dbConnection.manager.save(user);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  generateToken(userId: string): string {
    return sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  }
}
