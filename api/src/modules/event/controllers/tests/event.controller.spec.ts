import { IEventsRepository } from '@modules/event/repository/interfaces/events.repository';
import { CreateEventUsecase } from '@modules/event/usecases/create-event.usecase';
import { DeleteEventUsecase } from '@modules/event/usecases/delete-event.usecase';
import { ListEventsUsecase } from '@modules/event/usecases/list-events.usecase';
import { UpdateEventUsecase } from '@modules/event/usecases/update-event.usecase';
import { AppError } from '@shared/errors/app.error';
import { Request, Response } from 'express';
import { constants } from 'http2';
import { EventController } from '../event.controller';

const mockRequest = (
  body: any = {},
  params: any = {},
  query: any = {}
): Partial<Request> => ({
  body,
  params,
  query,
});
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('EventController', () => {
  let createEventUsecase: CreateEventUsecase;
  let listEventsUsecase: ListEventsUsecase;
  let updateEventUsecase: UpdateEventUsecase;
  let deleteEventUsecase: DeleteEventUsecase;
  let eventController: EventController;

  beforeEach(() => {
    createEventUsecase = new CreateEventUsecase({} as IEventsRepository);
    listEventsUsecase = new ListEventsUsecase({} as IEventsRepository);
    updateEventUsecase = new UpdateEventUsecase({} as IEventsRepository);
    deleteEventUsecase = new DeleteEventUsecase({} as IEventsRepository);
    eventController = new EventController(
      listEventsUsecase,
      createEventUsecase,
      updateEventUsecase,
      deleteEventUsecase
    );
  });

  test('should create an event and return HTTP 201', async () => {
    const req = mockRequest({ name: 'Event', odds: 1.5 });
    const res = mockResponse();
    jest
      .spyOn(createEventUsecase, 'execute')
      .mockResolvedValue({ event_id: 1 });

    await eventController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(constants.HTTP_STATUS_CREATED);
    expect(res.json).toHaveBeenCalledWith({ event_id: 1 });
  });

  test('should list events and return HTTP 200', async () => {
    const req = mockRequest({ page: '1', limit: '10' });
    const res = mockResponse();
    jest
      .spyOn(listEventsUsecase, 'execute')
      .mockResolvedValue({ events: [], total: 0, total_pages: 1 });

    await eventController.list(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(constants.HTTP_STATUS_OK);
    expect(res.json).toHaveBeenCalledWith({
      events: [],
      total: 0,
      total_pages: 1,
    });
  });

  test('should throw error if invalid page value in list', async () => {
    const req = mockRequest({ page: '0', limit: '10' });
    const res = mockResponse();
    await expect(
      eventController.list(req as Request, res as Response)
    ).rejects.toBeInstanceOf(TypeError);
  });

  test('should update an event and return HTTP 200', async () => {
    const req = mockRequest({ name: 'Updated Event', odds: 2.0 }, { id: '1' });
    const res = mockResponse();
    jest.spyOn(updateEventUsecase, 'execute').mockResolvedValue({
      event_id: 1,
      event_name: 'Updated Event',
      odds: 2.0,
    });

    await eventController.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(constants.HTTP_STATUS_OK);
    expect(res.json).toHaveBeenCalledWith({
      event_id: 1,
      event_name: 'Updated Event',
      odds: 2.0,
    });
  });

  test('should throw error if invalid id value in update', async () => {
    const req = mockRequest(
      { event_name: 'Updated Event', odds: 2.0 },
      { event_id: 'invalid' }
    );
    const res = mockResponse();
    await expect(
      eventController.update(req as Request, res as Response)
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should delete an event and return HTTP 200', async () => {
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();
    jest.spyOn(deleteEventUsecase, 'execute').mockResolvedValue(undefined);

    await eventController.delete(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(constants.HTTP_STATUS_OK);
    expect(res.send).toHaveBeenCalled();
  });

  test('should throw error if invalid id value in delete', async () => {
    const req = mockRequest({}, { event_id: 'invalid' });
    const res = mockResponse();
    await expect(
      eventController.delete(req as Request, res as Response)
    ).rejects.toBeInstanceOf(AppError);
  });
});
