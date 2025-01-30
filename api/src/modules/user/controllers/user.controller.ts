import { Request, Response } from 'express';
import { constants } from 'http2';
import { Inject, Service } from 'typedi';
import { CreateUserDto } from '../dtos/create-user.dtos';
import { LoginUserDto } from '../dtos/login-user.dtos';
import { CreateUserUsecase } from '../usecases/create-user.usecase';
import { LoginUserUsecase } from '../usecases/login-user.usecase';

@Service()
export class UserController {
  constructor(
    @Inject(() => CreateUserUsecase)
    private createUserUsecase: CreateUserUsecase,
    @Inject(() => LoginUserUsecase)
    private loginUserUsecase: LoginUserUsecase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password }: CreateUserDto = req.body;
      const result = await this.createUserUsecase.execute(username, password);
      return res.status(constants.HTTP_STATUS_CREATED).json(result);
    } catch (error: any) {
      console.error(error);
      return res
        .status(
          error?.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
        )
        .json({ message: error?.message || 'internal server error' });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password }: LoginUserDto = req.body;
      const result = await this.loginUserUsecase.execute(username, password);
      return res.status(constants.HTTP_STATUS_OK).json(result);
    } catch (error: any) {
      console.error(error);
      return res
        .status(
          error?.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
        )
        .json({ message: error?.message || 'internal server error' });
    }
  }
}
