import { EventController } from '@modules/event/controllers/event.controller';
import { Router } from 'express';
import Container from 'typedi';

const routes = Router();

const eventController = Container.get(EventController);

routes.post('/api/events', eventController.create.bind(eventController));
routes.get('/api/events', eventController.list.bind(eventController));
routes.patch('/api/events', eventController.update.bind(eventController));
routes.delete('/api/events', eventController.delete.bind(eventController));

export default routes;
