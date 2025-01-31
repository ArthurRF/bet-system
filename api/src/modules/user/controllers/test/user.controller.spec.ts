import { IUsersRepository } from '@modules/user/repository/interfaces/users.repository';
import { CreateUserUsecase } from '@modules/user/usecases/create-user.usecase';
import { LoginUserUsecase } from '@modules/user/usecases/login-user.usecase';
import { AppError } from '@shared/errors/app.error';
import { Request, Response } from 'express';
import { UserController } from '../user.controller';

const mockRequest = (body: any = {}): Partial<Request> => ({ body });
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('UserController', () => {
  let createUserUsecase: CreateUserUsecase;
  let loginUserUsecase: LoginUserUsecase;
  let userController: UserController;

  beforeEach(() => {
    createUserUsecase = new CreateUserUsecase({} as IUsersRepository);
    loginUserUsecase = new LoginUserUsecase({} as IUsersRepository);
    userController = new UserController(createUserUsecase, loginUserUsecase);
  });

  test('should create a user and return HTTP 201', async () => {
    const req = mockRequest({ username: 'user1', password: 'password' });
    const res = mockResponse();
    jest
      .spyOn(createUserUsecase, 'execute')
      .mockResolvedValue({ user_id: 'user1', token: 'token' });

    await userController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ user_id: 'user1', token: 'token' });
  });

  test('should login a user and return HTTP 200', async () => {
    const req = mockRequest({ username: 'user1', password: 'password' });
    const res = mockResponse();
    jest
      .spyOn(loginUserUsecase, 'execute')
      .mockResolvedValue({ user_id: 'user1', token: 'token' });

    await userController.login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ user_id: 'user1', token: 'token' });
  });

  test('should throw error if parameter is missing on create user', async () => {
    const req = mockRequest({ password: 'password' });
    const res = mockResponse();
    await expect(
      userController.create(req as Request, res as Response)
    ).rejects.toBeInstanceOf(TypeError);
  });

  test('should throw error if parameter is missing on login user', async () => {
    const req = mockRequest({ password: 'password' });
    const res = mockResponse();
    await expect(
      userController.login(req as Request, res as Response)
    ).rejects.toBeInstanceOf(TypeError);
  });

  test('should throw error if invalid password on login', async () => {
    const req = mockRequest({ username: 'user1', password: 'password' });
    const res = mockResponse();
    loginUserUsecase.execute = jest
      .fn()
      .mockRejectedValue(new AppError('Invalid password', 401));
    await expect(
      userController.login(req as Request, res as Response)
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should throw error if user not found on login', async () => {
    const req = mockRequest({ username: 'user1', password: 'password' });
    const res = mockResponse();
    loginUserUsecase.execute = jest
      .fn()
      .mockRejectedValue(new AppError('User not found', 404));
    await expect(
      userController.login(req as Request, res as Response)
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should throw error if repository error on create user', async () => {
    const req = mockRequest({ username: 'user1', password: 'password' });
    const res = mockResponse();
    createUserUsecase.execute = jest
      .fn()
      .mockRejectedValue(new Error('Repository error'));
    await expect(
      userController.create(req as Request, res as Response)
    ).rejects.toThrow('Repository error');
  });
});
