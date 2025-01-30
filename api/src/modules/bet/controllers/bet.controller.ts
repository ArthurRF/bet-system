import { Request, Response } from 'express';
import { constants } from 'http2';
import { CreateBetDto } from '../dtos/create-bet.dtos';
import { CreateBetUsecase } from '../usecases/create-bet.usecase';
import { ListBetsUsecase } from '../usecases/list-bets.usecase';

export class BetController {
  constructor(
    private createBetUsecase: CreateBetUsecase,
    private listBetsUsecase: ListBetsUsecase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { event_id, user_id, value }: CreateBetDto = req.body;
    const result = await this.createBetUsecase.execute(
      user_id,
      event_id,
      value
    );
    return res.status(constants.HTTP_STATUS_CREATED).json(result);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const bets = await this.listBetsUsecase.execute();
    return res.status(constants.HTTP_STATUS_OK).json(bets);
  }
}
