import { IListBetsResponse } from '../dtos/list-bets.dtos';
import { IBetsRepository } from '../repository/interfaces/bets.repository';

export class ListBetsUsecase {
  constructor(private betsRepository: IBetsRepository) {}

  async execute(): Promise<IListBetsResponse[]> {
    const bets = await this.betsRepository.list();
    return bets.map(bet => ({
      user_id: bet.user_id,
      event_id: bet.event_id,
      value: bet.value,
    }));
  }
}
