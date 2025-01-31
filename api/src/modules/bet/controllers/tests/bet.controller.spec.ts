import { Request, Response } from 'express';
import { constants } from 'http2';
import { IBetsRepository } from '../../repository/interfaces/bets.repository';
import { CreateBetUsecase } from '../../usecases/create-bet.usecase';
import { ListBetsUsecase } from '../../usecases/list-bets.usecase';
import { BetController } from '../bet.controller';

const mockRequest = (body: any = {}): Partial<Request> => ({ body });
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('BetController', () => {
  let createBetUsecase: CreateBetUsecase;
  let listBetsUsecase: ListBetsUsecase;
  let betController: BetController;

  beforeEach(() => {
    createBetUsecase = new CreateBetUsecase({} as IBetsRepository);
    listBetsUsecase = new ListBetsUsecase({} as IBetsRepository);
    betController = new BetController(createBetUsecase, listBetsUsecase);
  });

  test('should create a bet and return HTTP 201', async () => {
    const req = mockRequest({ user_id: 'user1', event_id: 123, value: 100 });
    const res = mockResponse();
    jest
      .spyOn(createBetUsecase, 'execute')
      .mockResolvedValue({ user_id: 'user1', event_id: 123, value: 100 });

    await betController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(constants.HTTP_STATUS_CREATED);
    expect(res.json).toHaveBeenCalledWith({
      user_id: 'user1',
      event_id: 123,
      value: 100,
    });
  });

  test('should list bets and return HTTP 200', async () => {
    const req = mockRequest() as Request;
    const res = mockResponse() as Response;
    jest.spyOn(listBetsUsecase, 'execute').mockResolvedValue([]);

    await betController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(constants.HTTP_STATUS_OK);
    expect(res.json).toHaveBeenCalledWith([]);
  });
});
