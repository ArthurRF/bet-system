import { DatabaseDataSource } from '@shared/infra/typeorm';
import { SportEvent } from '../infra/typeorm/entities/sport-event.entity';
import { IEventsRepository } from './interfaces/events.repository';

export class EventsRepository implements IEventsRepository {
  constructor(private dbConnection = DatabaseDataSource) {}

  async listWithPagination(
    offset: number,
    limit: number
  ): Promise<[SportEvent[], number]> {
    const events = await this.dbConnection.manager.query(
      'SELECT * FROM sport_event OFFSET $1 LIMIT $2',
      [offset, limit]
    );

    const countResult = await this.dbConnection.manager.query(
      'SELECT COUNT(*) FROM sport_event'
    );

    const total = parseInt(countResult[0].count, 10);

    return [events, total];
  }

  async findById(id: number): Promise<SportEvent | null> {
    const event: Array<SportEvent> = await this.dbConnection.manager.query(
      'SELECT * FROM sport_event WHERE event_id = $1',
      [id]
    );
    return event[0] || null;
  }

  async create(name: string, odds: number): Promise<SportEvent> {
    const event: Array<SportEvent> = await this.dbConnection.manager.query(
      'INSERT INTO sport_event (event_name, odds) VALUES ($1, $2) RETURNING *',
      [name, odds]
    );

    return event[0];
  }

  async update(id: number, name: string, odds: number): Promise<SportEvent> {
    const [event]: Array<SportEvent[]> = await this.dbConnection.manager.query(
      'UPDATE sport_event SET event_name = $1, odds = $2 WHERE event_id = $3 RETURNING *',
      [name, odds, id]
    );

    return event[0];
  }

  async delete(id: number): Promise<void> {
    await this.dbConnection.manager.query(
      'DELETE FROM sport_event WHERE event_id = $1',
      [id]
    );
  }
}
