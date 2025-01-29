import { AppError } from '@shared/errors/app.error';
import { constants } from 'http2';
import { Inject, Service } from 'typedi';
import { IUpdateEventResponse } from '../dtos/update-event.dtos';
import { EventsRepository } from '../repository/events.repository';
import { IEventsRepository } from '../repository/interfaces/events.repository';

@Service()
export class UpdateEventUsecase {
  constructor(
    @Inject(() => EventsRepository)
    private eventsRepository: IEventsRepository
  ) {}

  async execute(
    id: number,
    name: string,
    odds: number
  ): Promise<IUpdateEventResponse> {
    const eventFound = await this.eventsRepository.findById(id);

    if (!eventFound) {
      throw new AppError('event not found', constants.HTTP_STATUS_NOT_FOUND);
    }

    const eventUpdated = await this.eventsRepository.update(id, name, odds);

    return {
      event_id: eventUpdated.eventId,
      event_name: eventUpdated.eventName,
      odds: eventUpdated.odds,
    };
  }
}
