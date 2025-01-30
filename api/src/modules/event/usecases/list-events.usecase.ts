import { IListEventsResponse } from '../dtos/list-events.dtos';
import { IEventsRepository } from '../repository/interfaces/events.repository';

export class ListEventsUsecase {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(page: number, limit: number): Promise<IListEventsResponse> {
    const offset = (page - 1) * limit;
    const [events, total] = await this.eventsRepository.listWithPagination(
      offset,
      limit
    );

    return {
      total,
      total_pages: Math.ceil(total / limit),
      events: events.map(event => ({
        event_id: event.event_id,
        event_name: event.event_name,
        odds: event.odds,
      })),
    };
  }
}
