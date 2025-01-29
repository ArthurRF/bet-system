import { EventController } from '@modules/event/controllers/event.controller';
import { ICreateEventRequest } from '@modules/event/dtos/create-event.dtos';
import { IUpdateEventRequest } from '@modules/event/dtos/update-event.dtos';
import { Router } from 'express';
import Container from 'typedi';
import { bodyValidate } from '../middlewares/body-validate.middleware';

const routes = Router();

const eventController = Container.get(EventController);

routes.get('/api/events', eventController.list.bind(eventController));
routes.post(
  '/api/events',
  bodyValidate(ICreateEventRequest),
  eventController.create.bind(eventController)
);
routes.put(
  '/api/events/:id',
  bodyValidate(IUpdateEventRequest),
  eventController.update.bind(eventController)
);
routes.delete('/api/events/:id', eventController.delete.bind(eventController));

export default routes;
