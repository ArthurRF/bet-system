import { EventController } from '@modules/event/controllers/event.controller';
import { EventsRepository } from '@modules/event/repository/events.repository';
import { CreateEventUsecase } from '@modules/event/usecases/create-event.usecase';
import { DeleteEventUsecase } from '@modules/event/usecases/delete-event.usecase';
import { ListEventsUsecase } from '@modules/event/usecases/list-events.usecase';
import { UpdateEventUsecase } from '@modules/event/usecases/update-event.usecase';
import { UserController } from '@modules/user/controllers/user.controller';
import { UsersRepository } from '@modules/user/repository/users.repository';
import { CreateUserUsecase } from '@modules/user/usecases/create-user.usecase';
import { LoginUserUsecase } from '@modules/user/usecases/login-user.usecase';
import Container from 'typedi';

const InjectDependencies = (): void => {
  const eventsRepository = new EventsRepository();
  const listEventsUsecase = new ListEventsUsecase(eventsRepository);
  const createEventUsecase = new CreateEventUsecase(eventsRepository);
  const updateEventUsecase = new UpdateEventUsecase(eventsRepository);
  const deleteEventUsecase = new DeleteEventUsecase(eventsRepository);
  const eventController = new EventController(
    listEventsUsecase,
    createEventUsecase,
    updateEventUsecase,
    deleteEventUsecase
  );

  const usersRepository = new UsersRepository();
  const createUserUsecase = new CreateUserUsecase(usersRepository);
  const loginUserUsecase = new LoginUserUsecase(usersRepository);
  const userController = new UserController(
    createUserUsecase,
    loginUserUsecase
  );

  Container.set('EventController', eventController);
  Container.set('UserController', userController);
};

export { InjectDependencies };
