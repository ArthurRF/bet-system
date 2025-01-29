import { DatabaseDataSource } from '@shared/infra/typeorm';
import { Service } from 'typedi';
import { IListEventsResponse } from '../dtos/list-events.dtos';
import { SportEvent } from '../infra/typeorm/entities/sport-event.entity';

@Service()
export class ListEventsUsecase {
  constructor(private dbConnection = DatabaseDataSource) {}

  async execute(): Promise<IListEventsResponse[]> {
    const events = await this.dbConnection.manager.find(SportEvent);

    return events.map(event => ({
      id: event.event_id,
      title: event.event_name,
      odds: event.odds,
    }));
  }
}
