import { IEventsRepository } from '@modules/event/repository/interfaces/events.repository';
import { AppError } from '@shared/errors/app.error';
import { DeleteEventUsecase } from '../delete-event.usecase';

const now = new Date();
const mockEvent = {
  event_id: 1,
  event_name: 'Test Event',
  odds: 2.0,
  created_at: now,
  updated_at: now,
};

describe('DeleteEventUsecase', () => {
  let eventsRepository: IEventsRepository;
  let deleteEventUsecase: DeleteEventUsecase;

  beforeEach(() => {
    eventsRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as unknown as IEventsRepository;
    deleteEventUsecase = new DeleteEventUsecase(eventsRepository);
  });

  test('should delete an event successfully', async () => {
    jest.spyOn(eventsRepository, 'findById').mockResolvedValue(mockEvent);

    await deleteEventUsecase.execute(1);

    expect(eventsRepository.findById).toHaveBeenCalledWith(1);
    expect(eventsRepository.delete).toHaveBeenCalledWith(1);
    expect(eventsRepository.findById).toHaveBeenCalledTimes(1);
    expect(eventsRepository.delete).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if the event to be deleted is not found', async () => {
    jest.spyOn(eventsRepository, 'findById').mockResolvedValue(null);

    await expect(deleteEventUsecase.execute(999)).rejects.toBeInstanceOf(
      AppError
    );
    expect(eventsRepository.findById).toHaveBeenCalledWith(999);
    expect(eventsRepository.findById).toHaveBeenCalledTimes(1);
  });

  test('should handle repository errors gracefully', async () => {
    jest.spyOn(eventsRepository, 'findById').mockResolvedValue(mockEvent);
    jest
      .spyOn(eventsRepository, 'delete')
      .mockRejectedValue(new Error('Repository error'));

    await expect(deleteEventUsecase.execute(1)).rejects.toThrowError(
      'Repository error'
    );
    expect(eventsRepository.findById).toHaveBeenCalledWith(1);
    expect(eventsRepository.findById).toHaveBeenCalledTimes(1);
    expect(eventsRepository.delete).toHaveBeenCalledWith(1);
    expect(eventsRepository.delete).toHaveBeenCalledTimes(1);
  });
});
