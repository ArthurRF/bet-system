import { DatabaseDataSource } from '@shared/infra/typeorm';
import { Bet } from '../infra/typeorm/entities/bet.entity';
import { IBetsRepository } from './interfaces/bets.repository';

export class BetsRepository implements IBetsRepository {
  constructor(private dbConnection = DatabaseDataSource) {}

  async list(): Promise<Bet[]> {
    const bets: Array<Bet> = await this.dbConnection.manager.query(
      'SELECT * FROM bet'
    );
    return bets;
  }

  async create(user_id: string, event_id: number, value: number): Promise<Bet> {
    const bet: Array<Bet> = await this.dbConnection.manager.query(
      'INSERT INTO bet (user_id, event_id, value) VALUES ($1, $2, $3) RETURNING *',
      [user_id, event_id, value]
    );
    return bet[0];
  }
}
