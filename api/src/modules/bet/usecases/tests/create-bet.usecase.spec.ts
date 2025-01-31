import { Bet } from '../../infra/typeorm/entities/bet.entity';
import { IBetsRepository } from '../../repository/interfaces/bets.repository';
import { CreateBetUsecase } from '../create-bet.usecase';

describe('CreateBetUsecase', () => {
  let betsRepository: IBetsRepository;
  let createBetUsecase: CreateBetUsecase;

  beforeEach(() => {
    betsRepository = {
      create: jest.fn(),
      list: jest.fn(),
    } as unknown as IBetsRepository;
    createBetUsecase = new CreateBetUsecase(betsRepository);
  });

  test('should create a bet and return its data', async () => {
    const betData = {
      user_id: 'user1',
      event_id: 123,
      value: 100,
    };
    jest.spyOn(betsRepository, 'create').mockResolvedValue(betData as Bet);

    const result = await createBetUsecase.execute('user1', 123, 100);

    expect(result).toEqual(betData);
    expect(betsRepository.create).toHaveBeenCalledWith('user1', 123, 100);
  });
});
