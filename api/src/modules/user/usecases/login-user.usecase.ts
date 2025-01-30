import { AppError } from '@shared/errors/app.error';
import { Inject, Service } from 'typedi';
import { ICreateUserResponse } from '../dtos/create-user.dtos';
import { IUsersRepository } from '../repository/interfaces/users.repository';
import { UsersRepository } from '../repository/users.repository';

@Service()
export class LoginUserUsecase {
  constructor(
    @Inject(() => UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    username: string,
    password: string
  ): Promise<ICreateUserResponse> {
    const userFound = await this.usersRepository.findByUsername(username);

    if (!userFound) {
      throw new AppError('user not found');
    }

    const matchPassword = await this.usersRepository.comparePassword(
      password,
      userFound.password
    );

    if (!matchPassword) {
      throw new AppError('invalid password');
    }

    const token = this.usersRepository.generateToken(userFound.userId);

    return {
      user_id: userFound.userId,
      token,
    };
  }
}
