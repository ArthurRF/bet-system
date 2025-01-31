import { IEventsRepository } from '@modules/event/repository/interfaces/events.repository';
import { CreateEventUsecase } from '../create-event.usecase';

const mockEvent = { event_id: 1, event_name: 'New Event', odds: 2.0 };

describe('CreateEventUsecase', () => {
  let eventsRepository: IEventsRepository;
  let createEventUsecase: CreateEventUsecase;

  beforeEach(() => {
    eventsRepository = {
      create: jest.fn().mockResolvedValue(mockEvent),
    } as unknown as IEventsRepository;
    createEventUsecase = new CreateEventUsecase(eventsRepository);
  });

  test('should create an event and return event_id', async () => {
    const result = await createEventUsecase.execute('New Event', 2.0);

    expect(result).toEqual({ event_id: 1 });
    expect(eventsRepository.create).toHaveBeenCalledWith('New Event', 2.0);
    expect(eventsRepository.create).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if event creation fails', async () => {
    jest
      .spyOn(eventsRepository, 'create')
      .mockRejectedValue(new Error('Repository error'));

    await expect(createEventUsecase.execute('New Event', 2.0)).rejects.toThrow(
      'Repository error'
    );
    expect(eventsRepository.create).toHaveBeenCalledWith('New Event', 2.0);
    expect(eventsRepository.create).toHaveBeenCalledTimes(1);
  });
});
