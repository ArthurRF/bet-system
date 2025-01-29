import { Inject, Service } from 'typedi';
import { IListEventsResponse } from '../dtos/list-events.dtos';
import { EventsRepository } from '../repository/events.repository';
import { IEventsRepository } from '../repository/interfaces/events.repository';

@Service()
export class ListEventsUsecase {
  constructor(
    @Inject(() => EventsRepository)
    private eventsRepository: IEventsRepository
  ) {}

  async execute(): Promise<IListEventsResponse[]> {
    const events = await this.eventsRepository.list();

    return events.map(event => ({
      event_id: event.eventId,
      event_name: event.eventName,
      odds: event.odds,
    }));
  }
}
