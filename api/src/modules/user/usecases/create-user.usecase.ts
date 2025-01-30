import { AppError } from '@shared/errors/app.error';
import { ICreateUserResponse } from '../dtos/create-user.dtos';
import { IUsersRepository } from '../repository/interfaces/users.repository';

export class CreateUserUsecase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    username: string,
    password: string
  ): Promise<ICreateUserResponse> {
    const userFound = await this.usersRepository.findByUsername(username);

    if (userFound) {
      throw new AppError('user already exists');
    }

    const passwordHash = await this.usersRepository.hashPassword(password);
    const user = await this.usersRepository.create(username, passwordHash);

    const token = this.usersRepository.generateToken(user.user_id);

    return {
      user_id: user.user_id,
      token,
    };
  }
}
