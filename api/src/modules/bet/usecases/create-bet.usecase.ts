import { ICreateBetResponse } from '../dtos/create-bet.dtos';
import { IBetsRepository } from '../repository/interfaces/bets.repository';

export class CreateBetUsecase {
  constructor(private betsRepository: IBetsRepository) {}

  async execute(
    user_id: string,
    event_id: number,
    value: number
  ): Promise<ICreateBetResponse> {
    const bet = await this.betsRepository.create(user_id, event_id, value);
    return { user_id: bet.user_id, event_id: bet.event_id, value: bet.value };
  }
}
