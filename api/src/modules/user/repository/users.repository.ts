import { DatabaseDataSource } from '@shared/infra/typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from '../infra/typeorm/entities/user.entity';
import { IUsersRepository } from './interfaces/users.repository';

// This secret can be moved to an secret manager service
// but it's mocked for this example
const JWT_SECRET = 'bet-system-secret';
const JWT_EXPIRATION = '12h';

export class UsersRepository implements IUsersRepository {
  constructor(private dbConnection = DatabaseDataSource) {}

  async findByUsername(username: string): Promise<User | null> {
    let user = null;

    const result: Array<User> = await this.dbConnection.manager.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.length > 0) {
      [user] = result;
    }

    return user;
  }

  async create(username: string, password: string): Promise<User> {
    const user: Array<User> = await this.dbConnection.manager.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, password]
    );

    return user[0];
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
