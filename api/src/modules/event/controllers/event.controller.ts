import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { ListEventsUsecase } from '../services/list-events.service';

@Service()
export class EventController {
  constructor(
    @Inject(() => ListEventsUsecase)
    private listEventsUsecase: ListEventsUsecase
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.listEventsUsecase.execute();

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json('teste');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json('teste');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json('teste');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
