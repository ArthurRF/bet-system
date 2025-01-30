import { AppError } from '@shared/errors/app.error';
import { constants } from 'http2';
import { IEventsRepository } from '../repository/interfaces/events.repository';

export class DeleteEventUsecase {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(id: number): Promise<void> {
    const eventFound = await this.eventsRepository.findById(id);

    if (!eventFound) {
      throw new AppError('event not found', constants.HTTP_STATUS_NOT_FOUND);
    }

    await this.eventsRepository.delete(id);
  }
}
