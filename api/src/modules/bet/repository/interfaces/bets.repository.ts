import { Bet } from '@modules/bet/infra/typeorm/entities/bet.entity';

export type IBetsRepository = {
  list(): Promise<Bet[]>;
  create(user_id: string, event_id: number, value: number): Promise<Bet>;
};
