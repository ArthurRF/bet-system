import { IListEventsResponse } from '../dtos/list-events.dtos';
import { IEventsRepository } from '../repository/interfaces/events.repository';

export class ListEventsUsecase {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(): Promise<IListEventsResponse[]> {
    const events = await this.eventsRepository.list();

    return events.map(event => ({
      event_id: event.event_id,
      event_name: event.event_name,
      odds: event.odds,
    }));
  }
}
