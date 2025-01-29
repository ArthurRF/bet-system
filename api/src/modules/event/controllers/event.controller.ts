import { CreateEventDto } from '@modules/event/dtos/create-event.dtos';
import { Request, Response } from 'express';
import { constants } from 'http2';
import { Inject, Service } from 'typedi';
import { UpdateEventDto } from '../dtos/update-event.dtos';
import { CreateEventUsecase } from '../usecases/create-event.usecase';
import { DeleteEventUsecase } from '../usecases/delete-event.usecase';
import { ListEventsUsecase } from '../usecases/list-events.usecase';
import { UpdateEventUsecase } from '../usecases/update-event.usecase';

@Service()
export class EventController {
  constructor(
    @Inject(() => ListEventsUsecase)
    private listEventsUsecase: ListEventsUsecase,
    @Inject(() => CreateEventUsecase)
    private createEventUsecase: CreateEventUsecase,
    @Inject(() => UpdateEventUsecase)
    private updateEventUsecase: UpdateEventUsecase,
    @Inject(() => DeleteEventUsecase)
    private deleteEventUsecase: DeleteEventUsecase
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.listEventsUsecase.execute();

      return res.status(constants.HTTP_STATUS_OK).json(result);
    } catch (error: any) {
      console.error(error);
      return res
        .status(
          error?.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
        )
        .json({ message: error?.message || 'Internal server error' });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, odds }: CreateEventDto = req.body;
      const result = await this.createEventUsecase.execute(name, odds);
      return res.status(constants.HTTP_STATUS_CREATED).json(result);
    } catch (error: any) {
      console.error(error);
      return res
        .status(
          error?.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
        )
        .json({ message: error?.message || 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          message: 'id is required',
        });
      }

      const parsedId = Number(id);
      if (Number.isNaN(parsedId)) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          message: 'id is invalid',
        });
      }

      const { name, odds }: UpdateEventDto = req.body;

      const result = await this.updateEventUsecase.execute(
        parsedId,
        name,
        odds
      );

      return res.status(constants.HTTP_STATUS_OK).json(result);
    } catch (error: any) {
      console.error(error);
      return res
        .status(
          error?.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
        )
        .json({ message: error?.message || 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          message: 'id is required',
        });
      }

      const parsedId = Number(id);
      if (Number.isNaN(parsedId)) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          message: 'id is invalid',
        });
      }

      await this.deleteEventUsecase.execute(parsedId);

      return res.status(constants.HTTP_STATUS_OK).send();
    } catch (error) {
      console.error(error);
      return res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
}
