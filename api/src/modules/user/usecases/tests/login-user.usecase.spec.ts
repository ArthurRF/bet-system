import { ICreateUserResponse } from '@modules/user/dtos/create-user.dtos';
import { IUsersRepository } from '@modules/user/repository/interfaces/users.repository';
import { AppError } from '@shared/errors/app.error';
import { LoginUserUsecase } from '../login-user.usecase';

const now = new Date();
const mockUser = {
  user_id: '1',
  username: 'john_doe',
  password: 'hashed_password',
  created_at: now,
  updated_at: now,
};

describe('LoginUserUsecase', () => {
  let usersRepository: IUsersRepository;
  let loginUserUsecase: LoginUserUsecase;

  beforeEach(() => {
    usersRepository = {
      findByUsername: jest.fn(),
      comparePassword: jest.fn(),
      generateToken: jest.fn().mockReturnValue('mock_token'),
    } as unknown as IUsersRepository;

    loginUserUsecase = new LoginUserUsecase(usersRepository);
  });

  test('should log in the user and return the correct response', async () => {
    const username = 'john_doe';
    const password = 'plain_password';

    jest.spyOn(usersRepository, 'findByUsername').mockResolvedValue(mockUser);
    jest.spyOn(usersRepository, 'comparePassword').mockResolvedValue(true);

    const result: ICreateUserResponse = await loginUserUsecase.execute(
      username,
      password
    );

    expect(result).toEqual({
      user_id: mockUser.user_id,
      token: 'mock_token',
    });
    expect(usersRepository.findByUsername).toHaveBeenCalledWith(username);
    expect(usersRepository.comparePassword).toHaveBeenCalledWith(
      password,
      mockUser.password
    );
    expect(usersRepository.generateToken).toHaveBeenCalledWith(
      mockUser.user_id
    );
  });

  test('should throw an error if the user is not found', async () => {
    const username = 'john_doe';
    const password = 'plain_password';

    jest.spyOn(usersRepository, 'findByUsername').mockResolvedValue(null);

    await expect(
      loginUserUsecase.execute(username, password)
    ).rejects.toBeInstanceOf(AppError);
    expect(usersRepository.findByUsername).toHaveBeenCalledWith(username);
    expect(usersRepository.comparePassword).not.toHaveBeenCalled();
    expect(usersRepository.generateToken).not.toHaveBeenCalled();
  });

  test('should throw an error if the password is invalid', async () => {
    const username = 'john_doe';
    const password = 'wrong_password';

    jest.spyOn(usersRepository, 'findByUsername').mockResolvedValue(mockUser);
    jest.spyOn(usersRepository, 'comparePassword').mockResolvedValue(false);

    await expect(
      loginUserUsecase.execute(username, password)
    ).rejects.toBeInstanceOf(AppError);

    expect(usersRepository.findByUsername).toHaveBeenCalledWith(username);
    expect(usersRepository.comparePassword).toHaveBeenCalledWith(
      password,
      mockUser.password
    );
    expect(usersRepository.generateToken).not.toHaveBeenCalled();
  });

  test('should handle repository errors gracefully', async () => {
    const username = 'john_doe';
    const password = 'plain_password';

    jest
      .spyOn(usersRepository, 'findByUsername')
      .mockRejectedValue(new Error('Repository error'));

    await expect(loginUserUsecase.execute(username, password)).rejects.toThrow(
      'Repository error'
    );
    expect(usersRepository.findByUsername).toHaveBeenCalledWith(username);
    expect(usersRepository.comparePassword).not.toHaveBeenCalled();
    expect(usersRepository.generateToken).not.toHaveBeenCalled();
  });
});
