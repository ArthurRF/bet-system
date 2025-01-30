import { ICreateEventResponse } from '../dtos/create-event.dtos';
import { IEventsRepository } from '../repository/interfaces/events.repository';

export class CreateEventUsecase {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(name: string, odds: number): Promise<ICreateEventResponse> {
    const event = await this.eventsRepository.create(name, odds);
    return { event_id: event.event_id };
  }
}
