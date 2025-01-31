import { IEventsRepository } from '@modules/event/repository/interfaces/events.repository';
import { AppError } from '@shared/errors/app.error';
import { UpdateEventUsecase } from '../update-event.usecase';

const mockEvent = { event_id: 1, event_name: 'Updated Event', odds: 2.5 };

describe('UpdateEventUsecase', () => {
  let eventsRepository: IEventsRepository;
  let updateEventUsecase: UpdateEventUsecase;

  beforeEach(() => {
    eventsRepository = {
      findById: jest.fn(),
      update: jest.fn().mockResolvedValue(mockEvent),
    } as unknown as IEventsRepository;
    updateEventUsecase = new UpdateEventUsecase(eventsRepository);
  });

  test('should update an event and return the updated event details', async () => {
    const now = new Date();
    jest.spyOn(eventsRepository, 'findById').mockResolvedValue({
      event_id: 1,
      event_name: 'Old Event',
      odds: 2.0,
      created_at: now,
      updated_at: now,
    });

    const result = await updateEventUsecase.execute(1, 'Updated Event', 2.5);

    expect(result).toEqual({
      event_id: 1,
      event_name: 'Updated Event',
      odds: 2.5,
    });
    expect(eventsRepository.findById).toHaveBeenCalledWith(1);
    expect(eventsRepository.update).toHaveBeenCalledWith(
      1,
      'Updated Event',
      2.5
    );
    expect(eventsRepository.findById).toHaveBeenCalledTimes(1);
    expect(eventsRepository.update).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if the event to be updated is not found', async () => {
    jest.spyOn(eventsRepository, 'findById').mockResolvedValue(null);

    await expect(
      updateEventUsecase.execute(999, 'Updated Event', 2.5)
    ).rejects.toBeInstanceOf(AppError);
    expect(eventsRepository.findById).toHaveBeenCalledWith(999);
    expect(eventsRepository.findById).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if the event update fails', async () => {
    const now = new Date();
    jest.spyOn(eventsRepository, 'findById').mockResolvedValue({
      event_id: 1,
      event_name: 'Old Event',
      odds: 2.0,
      created_at: now,
      updated_at: now,
    });

    jest
      .spyOn(eventsRepository, 'update')
      .mockRejectedValue(new Error('Repository error'));

    await expect(
      updateEventUsecase.execute(1, 'Updated Event', 2.5)
    ).rejects.toThrowError('Repository error');
    expect(eventsRepository.findById).toHaveBeenCalledWith(1);
    expect(eventsRepository.update).toHaveBeenCalledWith(
      1,
      'Updated Event',
      2.5
    );
    expect(eventsRepository.findById).toHaveBeenCalledTimes(1);
    expect(eventsRepository.update).toHaveBeenCalledTimes(1);
  });
});
