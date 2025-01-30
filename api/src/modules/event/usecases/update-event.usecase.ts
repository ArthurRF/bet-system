import { AppError } from '@shared/errors/app.error';
import { constants } from 'http2';
import { IUpdateEventResponse } from '../dtos/update-event.dtos';
import { IEventsRepository } from '../repository/interfaces/events.repository';

export class UpdateEventUsecase {
  constructor(private eventsRepository: IEventsRepository) {}

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
      event_id: eventUpdated.event_id,
      event_name: eventUpdated.event_name,
      odds: eventUpdated.odds,
    };
  }
}
