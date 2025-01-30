import { CreateEventDto } from '@modules/event/dtos/create-event.dtos';
import { AppError } from '@shared/errors/app.error';
import { Request, Response } from 'express';
import { constants } from 'http2';
import { UpdateEventDto } from '../dtos/update-event.dtos';
import { CreateEventUsecase } from '../usecases/create-event.usecase';
import { DeleteEventUsecase } from '../usecases/delete-event.usecase';
import { ListEventsUsecase } from '../usecases/list-events.usecase';
import { UpdateEventUsecase } from '../usecases/update-event.usecase';

export class EventController {
  constructor(
    private listEventsUsecase: ListEventsUsecase,
    private createEventUsecase: CreateEventUsecase,
    private updateEventUsecase: UpdateEventUsecase,
    private deleteEventUsecase: DeleteEventUsecase
  ) {}

  async list(req: Request, res: Response): Promise<Response> {
    const result = await this.listEventsUsecase.execute();

    return res.status(constants.HTTP_STATUS_OK).json(result);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, odds }: CreateEventDto = req.body;
    const result = await this.createEventUsecase.execute(name, odds);
    return res.status(constants.HTTP_STATUS_CREATED).json(result);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      throw new AppError('id is required', constants.HTTP_STATUS_BAD_REQUEST);
    }

    const parsedId = Number(id);
    if (Number.isNaN(parsedId)) {
      throw new AppError('id is invalid', constants.HTTP_STATUS_BAD_REQUEST);
    }

    const { name, odds }: UpdateEventDto = req.body;

    const result = await this.updateEventUsecase.execute(parsedId, name, odds);

    return res.status(constants.HTTP_STATUS_OK).json(result);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      throw new AppError('id is required', constants.HTTP_STATUS_BAD_REQUEST);
    }

    const parsedId = Number(id);
    if (Number.isNaN(parsedId)) {
      throw new AppError('id is invalid', constants.HTTP_STATUS_BAD_REQUEST);
    }

    await this.deleteEventUsecase.execute(parsedId);

    return res.status(constants.HTTP_STATUS_OK).send();
  }
}
