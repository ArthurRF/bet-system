import { SportEvent } from '@modules/event/infra/typeorm/entities/sport-event.entity';

export type IEventsRepository = {
  list(): Promise<SportEvent[]>;
  create(name: string, odds: number): Promise<SportEvent>;
  // update(): Promise<void>;
  // delete(): Promise<void>;
};
