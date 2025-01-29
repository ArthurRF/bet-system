import { Request, Response } from 'express';
import { constants } from 'http2';
import { Inject, Service } from 'typedi';
import { CreateEventUsecase } from '../usecases/create-event.usecase';
import { ListEventsUsecase } from '../usecases/list-events.usecase';

@Service()
export class EventController {
  constructor(
    @Inject(() => ListEventsUsecase)
    private listEventsUsecase: ListEventsUsecase,
    @Inject(() => CreateEventUsecase)
    private createEventUsecase: CreateEventUsecase
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.listEventsUsecase.execute();

      return res.status(constants.HTTP_STATUS_OK).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, odds } = req.body;
      const result = await this.createEventUsecase.execute(name, odds);
      return res.status(constants.HTTP_STATUS_CREATED).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json('teste');
    } catch (error) {
      console.error(error);
      return res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json('teste');
    } catch (error) {
      console.error(error);
      return res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
}
