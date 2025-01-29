import { SportEvent } from '@modules/event/infra/typeorm/entities/sport-event.entity';

export type IEventsRepository = {
  list(): Promise<SportEvent[]>;
  findById(id: number): Promise<SportEvent | null>;
  create(name: string, odds: number): Promise<SportEvent>;
  update(id: number, name: string, odds: number): Promise<SportEvent>;
  // delete(): Promise<void>;
};
