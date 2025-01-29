import { Inject, Service } from 'typedi';
import { ICreateEventResponse } from '../dtos/create-event.dtos';
import { EventsRepository } from '../repository/events.repository';
import { IEventsRepository } from '../repository/interfaces/events.repository';

@Service()
export class CreateEventUsecase {
  constructor(
    @Inject(() => EventsRepository)
    private eventsRepository: IEventsRepository
  ) {}

  async execute(name: string, odds: number): Promise<ICreateEventResponse> {
    const event = await this.eventsRepository.create(name, odds);
    return { event_id: event.eventId };
  }
}
