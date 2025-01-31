import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { DatabaseDataSource } from '../../../../shared/infra/typeorm';
import { UsersRepository } from '../users.repository';

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
  genSalt: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let mockDbConnection: typeof DatabaseDataSource;

  beforeEach(() => {
    mockDbConnection = {
      manager: {
        query: jest.fn(),
      },
    } as unknown as typeof DatabaseDataSource;

    usersRepository = new UsersRepository(mockDbConnection);
  });

  test('should find a user by username', async () => {
    const user = {
      user_id: '1',
      username: 'john_doe',
      password: 'hashed_password',
    };
    jest.spyOn(mockDbConnection.manager, 'query').mockResolvedValue([user]);

    const result = await usersRepository.findByUsername('john_doe');

    expect(result).toEqual(user);
    expect(mockDbConnection.manager.query).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE username = $1',
      ['john_doe']
    );
  });

  test('should return null if user not found by username', async () => {
    jest.spyOn(mockDbConnection.manager, 'query').mockResolvedValue([]);

    const result = await usersRepository.findByUsername('non_existent_user');

    expect(result).toBeNull();
    expect(mockDbConnection.manager.query).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE username = $1',
      ['non_existent_user']
    );
  });

  test('should create a new user and return its data', async () => {
    const now = new Date();
    const userData = {
      user_id: '2',
      username: 'john_doe',
      password: 'hashed_password',
      created_at: now,
      updated_at: now,
    };
    jest.spyOn(mockDbConnection.manager, 'query').mockResolvedValue([userData]);

    const result = await usersRepository.create('john_doe', 'plain_password');

    expect(result).toEqual(userData);
    expect(mockDbConnection.manager.query).toHaveBeenCalledWith(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      ['john_doe', 'plain_password']
    );
  });

  test('should hash password', async () => {
    const password = 'plain_password';
    const mockHashedPassword = 'hashed_password';
    const mockSalt = 'mock_salt';

    (genSalt as jest.Mock).mockResolvedValue(mockSalt);
    (hash as jest.Mock).mockResolvedValue(mockHashedPassword);

    const result = await usersRepository.hashPassword(password);

    expect(result).toBe(mockHashedPassword);
    expect(genSalt).toHaveBeenCalledWith(10);
    expect(hash).toHaveBeenCalledWith(password, mockSalt);
  });

  test('should compare password with hashed password', async () => {
    const password = 'plain_password';
    const hashedPassword = 'hashed_password';
    (compare as jest.Mock).mockResolvedValue(true);

    const result = await usersRepository.comparePassword(
      password,
      hashedPassword
    );

    expect(result).toBe(true);
    expect(compare).toHaveBeenCalledWith(password, hashedPassword);
  });

  test('should generate JWT token', () => {
    const userId = '1';
    const mockToken = 'mock_jwt_token';
    (sign as jest.Mock).mockReturnValue(mockToken);

    const result = usersRepository.generateToken(userId);

    expect(result).toBe(mockToken);
    expect(sign).toHaveBeenCalledWith({ id: userId }, 'bet-system-secret', {
      expiresIn: '12h',
    });
  });
});
