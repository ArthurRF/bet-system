import { IEventsRepository } from '@modules/event/repository/interfaces/events.repository';
import { ListEventsUsecase } from '../list-events.usecase';

const now = new Date();
const mockEvents = [
  {
    event_id: 1,
    event_name: 'Event 1',
    odds: 2.5,
    created_at: now,
    updated_at: now,
  },
  {
    event_id: 2,
    event_name: 'Event 2',
    odds: 3.0,
    created_at: now,
    updated_at: now,
  },
];
const total = 2;

describe('ListEventsUsecase', () => {
  let eventsRepository: IEventsRepository;
  let listEventsUsecase: ListEventsUsecase;

  beforeEach(() => {
    eventsRepository = {
      listWithPagination: jest.fn().mockResolvedValue([mockEvents, total]),
    } as unknown as IEventsRepository;
    listEventsUsecase = new ListEventsUsecase(eventsRepository);
  });

  test('should list events with pagination and map the response correctly', async () => {
    const page = 1;
    const limit = 2;
    const result = await listEventsUsecase.execute(page, limit);

    expect(result).toEqual({
      total,
      total_pages: 1,
      events: [
        { event_id: 1, event_name: 'Event 1', odds: 2.5 },
        { event_id: 2, event_name: 'Event 2', odds: 3.0 },
      ],
    });
    expect(eventsRepository.listWithPagination).toHaveBeenCalledWith(0, 2);
    expect(eventsRepository.listWithPagination).toHaveBeenCalledTimes(1);
  });

  test('should return empty events when no events are found', async () => {
    jest
      .spyOn(eventsRepository, 'listWithPagination')
      .mockResolvedValue([[], 0]);

    const result = await listEventsUsecase.execute(1, 2);

    expect(result).toEqual({
      total: 0,
      total_pages: 0,
      events: [],
    });
    expect(eventsRepository.listWithPagination).toHaveBeenCalledWith(0, 2);
    expect(eventsRepository.listWithPagination).toHaveBeenCalledTimes(1);
  });

  test('should calculate total_pages correctly', async () => {
    const total = 5;
    jest
      .spyOn(eventsRepository, 'listWithPagination')
      .mockResolvedValue([mockEvents, total]);

    const result = await listEventsUsecase.execute(1, 2);

    expect(result.total_pages).toBe(3);
  });

  test('should handle repository errors gracefully', async () => {
    jest
      .spyOn(eventsRepository, 'listWithPagination')
      .mockRejectedValue(new Error('Repository error'));

    await expect(listEventsUsecase.execute(1, 2)).rejects.toThrowError(
      'Repository error'
    );
    expect(eventsRepository.listWithPagination).toHaveBeenCalledTimes(1);
  });
});
