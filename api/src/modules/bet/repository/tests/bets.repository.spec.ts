import { DatabaseDataSource } from '../../../../shared/infra/typeorm';
import { Bet } from '../../infra/typeorm/entities/bet.entity';
import { BetsRepository } from '../bets.repository';

describe('BetsRepository', () => {
  let betsRepository: BetsRepository;
  let mockDbConnection: typeof DatabaseDataSource;

  beforeEach(() => {
    mockDbConnection = {
      manager: {
        query: jest.fn(),
      },
    } as unknown as typeof DatabaseDataSource;

    betsRepository = new BetsRepository(mockDbConnection);
  });

  test('should list all bets', async () => {
    const now = new Date();
    const betList: Bet[] = [
      {
        user_id: 'user1',
        event_id: 123,
        value: 100,
        created_at: now,
        updated_at: now,
      },
    ];
    jest.spyOn(mockDbConnection.manager, 'query').mockResolvedValue(betList);

    const result = await betsRepository.list();

    expect(result).toEqual(betList);
    expect(mockDbConnection.manager.query).toHaveBeenCalledWith(
      'SELECT * FROM bet'
    );
  });

  test('should create a new bet and return its data', async () => {
    const now = new Date();
    const betData: Bet = {
      user_id: 'user1',
      event_id: 123,
      value: 100,
      created_at: now,
      updated_at: now,
    };
    jest.spyOn(mockDbConnection.manager, 'query').mockResolvedValue([betData]);

    const result = await betsRepository.create('user1', 123, 100);

    expect(result).toEqual(betData);
    expect(mockDbConnection.manager.query).toHaveBeenCalledWith(
      'INSERT INTO bet (user_id, event_id, value) VALUES ($1, $2, $3) RETURNING *',
      ['user1', 123, 100]
    );
  });
});
