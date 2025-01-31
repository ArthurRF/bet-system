import { ICreateUserResponse } from '@modules/user/dtos/create-user.dtos';
import { IUsersRepository } from '@modules/user/repository/interfaces/users.repository';
import { AppError } from '@shared/errors/app.error';
import { CreateUserUsecase } from '../create-user.usecase';

const now = new Date();
const mockUser = {
  user_id: '1',
  username: 'john_doe',
  password: 'hashed_password',
  created_at: now,
  updated_at: now,
};

describe('CreateUserUsecase', () => {
  let usersRepository: IUsersRepository;
  let createUserUsecase: CreateUserUsecase;

  beforeEach(() => {
    usersRepository = {
      findByUsername: jest.fn(),
      hashPassword: jest.fn().mockResolvedValue('hashed_password'),
      create: jest.fn().mockResolvedValue(mockUser),
      generateToken: jest.fn().mockReturnValue('mock_token'),
    } as unknown as IUsersRepository;

    createUserUsecase = new CreateUserUsecase(usersRepository);
  });

  test('should create a new user and return the correct response', async () => {
    const username = 'john_doe';
    const password = 'plain_password';

    const result: ICreateUserResponse = await createUserUsecase.execute(
      username,
      password
    );

    expect(result).toEqual({
      user_id: mockUser.user_id,
      token: 'mock_token',
    });
    expect(usersRepository.findByUsername).toHaveBeenCalledWith(username);
    expect(usersRepository.hashPassword).toHaveBeenCalledWith(password);
    expect(usersRepository.create).toHaveBeenCalledWith(
      username,
      'hashed_password'
    );
    expect(usersRepository.generateToken).toHaveBeenCalledWith(
      mockUser.user_id
    );
  });

  test('should throw an error if the user already exists', async () => {
    const username = 'john_doe';
    const password = 'plain_password';

    jest.spyOn(usersRepository, 'findByUsername').mockResolvedValue(mockUser);

    await expect(
      createUserUsecase.execute(username, password)
    ).rejects.toBeInstanceOf(AppError);
    expect(usersRepository.findByUsername).toHaveBeenCalledWith(username);
    expect(usersRepository.hashPassword).not.toHaveBeenCalled();
    expect(usersRepository.create).not.toHaveBeenCalled();
  });

  test('should handle repository errors gracefully', async () => {
    const username = 'john_doe';
    const password = 'plain_password';

    jest
      .spyOn(usersRepository, 'findByUsername')
      .mockRejectedValue(new Error('Repository error'));

    await expect(createUserUsecase.execute(username, password)).rejects.toThrow(
      'Repository error'
    );
    expect(usersRepository.findByUsername).toHaveBeenCalledWith(username);
    expect(usersRepository.hashPassword).not.toHaveBeenCalled();
    expect(usersRepository.create).not.toHaveBeenCalled();
  });
});
