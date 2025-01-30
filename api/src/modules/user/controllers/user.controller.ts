import { Request, Response } from 'express';
import { constants } from 'http2';
import { CreateUserDto } from '../dtos/create-user.dtos';
import { LoginUserDto } from '../dtos/login-user.dtos';
import { CreateUserUsecase } from '../usecases/create-user.usecase';
import { LoginUserUsecase } from '../usecases/login-user.usecase';

export class UserController {
  constructor(
    private createUserUsecase: CreateUserUsecase,
    private loginUserUsecase: LoginUserUsecase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { username, password }: CreateUserDto = req.body;
    const result = await this.createUserUsecase.execute(username, password);
    return res.status(constants.HTTP_STATUS_CREATED).json(result);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { username, password }: LoginUserDto = req.body;
    const result = await this.loginUserUsecase.execute(username, password);
    return res.status(constants.HTTP_STATUS_OK).json(result);
  }
}
