import { DatabaseDataSource } from '@shared/infra/typeorm';
import { EventsRepository } from '../events.repository';

jest.mock('@shared/infra/typeorm', () => ({
  DatabaseDataSource: {
    manager: {
      query: jest.fn(),
    },
  },
}));

describe('EventsRepository', () => {
  let eventsRepository: EventsRepository;

  beforeEach(() => {
    eventsRepository = new EventsRepository(DatabaseDataSource);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should list events with pagination', async () => {
    const mockEventList = [{ event_id: 1, event_name: 'Event 1', odds: 1.5 }];
    const mockTotalCount = [{ count: '1' }];
    (DatabaseDataSource.manager.query as jest.Mock)
      .mockResolvedValueOnce(mockEventList)
      .mockResolvedValueOnce(mockTotalCount);

    const [events, total] = await eventsRepository.listWithPagination(0, 10);

    expect(DatabaseDataSource.manager.query).toHaveBeenCalledWith(
      'SELECT * FROM sport_event OFFSET $1 LIMIT $2',
      [0, 10]
    );
    expect(DatabaseDataSource.manager.query).toHaveBeenCalledWith(
      'SELECT COUNT(*) FROM sport_event'
    );
    expect(events).toEqual(mockEventList);
    expect(total).toBe(1);
  });

  test('should find an event by id', async () => {
    const mockEvent = { event_id: 1, event_name: 'Event 1', odds: 1.5 };
    (DatabaseDataSource.manager.query as jest.Mock).mockResolvedValueOnce([
      mockEvent,
    ]);

    const event = await eventsRepository.findById(1);

    expect(DatabaseDataSource.manager.query).toHaveBeenCalledWith(
      'SELECT * FROM sport_event WHERE event_id = $1',
      [1]
    );
    expect(event).toEqual(mockEvent);
  });

  test('should return null if event not found by id', async () => {
    (DatabaseDataSource.manager.query as jest.Mock).mockResolvedValueOnce([]);

    const event = await eventsRepository.findById(999);

    expect(event).toBeNull();
  });

  test('should create a new event', async () => {
    const mockEvent = { event_id: 1, event_name: 'New Event', odds: 2.0 };
    (DatabaseDataSource.manager.query as jest.Mock).mockResolvedValueOnce([
      mockEvent,
    ]);

    const event = await eventsRepository.create('New Event', 2.0);

    expect(DatabaseDataSource.manager.query).toHaveBeenCalledWith(
      'INSERT INTO sport_event (event_name, odds) VALUES ($1, $2) RETURNING *',
      ['New Event', 2.0]
    );
    expect(event).toEqual(mockEvent);
  });

  test('should update an existing event', async () => {
    const mockUpdatedEvent = {
      event_id: 1,
      event_name: 'Updated Event',
      odds: 2.5,
    };
    (DatabaseDataSource.manager.query as jest.Mock).mockResolvedValueOnce([
      [mockUpdatedEvent],
      1,
    ]);

    const event = await eventsRepository.update(1, 'Updated Event', 2.5);

    expect(DatabaseDataSource.manager.query).toHaveBeenCalledWith(
      'UPDATE sport_event SET event_name = $1, odds = $2 WHERE event_id = $3 RETURNING *',
      ['Updated Event', 2.5, 1]
    );
    expect(event).toEqual(mockUpdatedEvent);
  });

  test('should delete an event', async () => {
    const deleteMock = jest.fn();
    (DatabaseDataSource.manager.query as jest.Mock).mockResolvedValueOnce(
      deleteMock
    );

    await eventsRepository.delete(1);

    expect(DatabaseDataSource.manager.query).toHaveBeenCalledWith(
      'DELETE FROM sport_event WHERE event_id = $1',
      [1]
    );
  });
});
