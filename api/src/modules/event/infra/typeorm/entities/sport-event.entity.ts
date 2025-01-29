import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SportEvent {
  @PrimaryGeneratedColumn({
    name: 'event_id',
  })
  eventId: number;

  @Column({
    name: 'event_name',
  })
  eventName: string;

  @Column({ name: 'odds', type: 'float' })
  odds: number;
}
