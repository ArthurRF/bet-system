import { EventController } from '@modules/event/controllers/event.controller';
import { ICreateEventRequest } from '@modules/event/dtos/create-event.dtos';
import { IUpdateEventRequest } from '@modules/event/dtos/update-event.dtos';
import { UserController } from '@modules/user/controllers/user.controller';
import { ICreateUserRequest } from '@modules/user/dtos/create-user.dtos';
import { ILoginUserRequest } from '@modules/user/dtos/login-user.dtos';
import { InjectDependencies } from '@shared/infra/config';
import { Router } from 'express';
import Container from 'typedi';
import { bodyValidate } from '../middlewares/body-validate.middleware';

const routes = Router();
InjectDependencies();

const userController = Container.get<UserController>('UserController');
const eventController = Container.get<EventController>('EventController');

// events routes
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

// user routes
routes.post(
  '/api/users',
  bodyValidate(ICreateUserRequest),
  userController.create.bind(userController)
);
routes.post(
  '/api/users/login',
  bodyValidate(ILoginUserRequest),
  userController.login.bind(userController)
);

export default routes;
