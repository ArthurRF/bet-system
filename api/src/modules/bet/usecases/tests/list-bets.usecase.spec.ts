import { IBetsRepository } from '@modules/bet/repository/interfaces/bets.repository';
import { ListBetsUsecase } from '../list-bets.usecase';

// Mock data to simulate repository behavior
const mockBets = [
  { user_id: 'user1', event_id: 123, value: 100 },
  { user_id: 'user2', event_id: 456, value: 200 },
];

describe('ListBetsUsecase', () => {
  let betsRepository: IBetsRepository;
  let listBetsUsecase: ListBetsUsecase;

  beforeEach(() => {
    betsRepository = {
      list: jest.fn().mockResolvedValue(mockBets),
    } as unknown as IBetsRepository;
    listBetsUsecase = new ListBetsUsecase(betsRepository);
  });

  test('should list all bets and map the response correctly', async () => {
    const result = await listBetsUsecase.execute();

    expect(result).toEqual([
      { user_id: 'user1', event_id: 123, value: 100 },
      { user_id: 'user2', event_id: 456, value: 200 },
    ]);
    expect(betsRepository.list).toHaveBeenCalledTimes(1);
  });

  test('should return an empty array when no bets are found', async () => {
    jest.spyOn(betsRepository, 'list').mockResolvedValue([]);

    const result = await listBetsUsecase.execute();

    expect(result).toEqual([]);
    expect(betsRepository.list).toHaveBeenCalledTimes(1);
  });

  test('should handle repository errors gracefully', async () => {
    jest
      .spyOn(betsRepository, 'list')
      .mockRejectedValue(new Error('Repository error'));

    await expect(listBetsUsecase.execute()).rejects.toThrow('Repository error');
    expect(betsRepository.list).toHaveBeenCalledTimes(1);
  });
});
