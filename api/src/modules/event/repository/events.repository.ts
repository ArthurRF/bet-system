import { DatabaseDataSource } from '@shared/infra/typeorm';
import { Service } from 'typedi';
import { SportEvent } from '../infra/typeorm/entities/sport-event.entity';
import { IEventsRepository } from './interfaces/events.repository';

@Service()
export class EventsRepository implements IEventsRepository {
  constructor(private dbConnection = DatabaseDataSource) {}

  async list(): Promise<SportEvent[]> {
    return this.dbConnection.manager.find(SportEvent);
  }

  async create(name: string, odds: number): Promise<SportEvent> {
    const event = new SportEvent();
    event.eventName = name;
    event.odds = odds;
    return this.dbConnection.manager.save(event);
  }
}
