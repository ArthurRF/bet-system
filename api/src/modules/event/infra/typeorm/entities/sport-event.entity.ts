import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
