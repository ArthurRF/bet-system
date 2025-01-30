import { BetController } from '@modules/bet/controllers/bet.controller';
import { BetsRepository } from '@modules/bet/repository/bets.repository';
import { CreateBetUsecase } from '@modules/bet/usecases/create-bet.usecase';
import { ListBetsUsecase } from '@modules/bet/usecases/list-bets.usecase';
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

  const betsRepository = new BetsRepository();
  const createBetUsecase = new CreateBetUsecase(betsRepository);
  const listBetsUsecase = new ListBetsUsecase(betsRepository);
  const betController = new BetController(createBetUsecase, listBetsUsecase);

  Container.set('EventController', eventController);
  Container.set('UserController', userController);
  Container.set('BetController', betController);
};

export { InjectDependencies };
