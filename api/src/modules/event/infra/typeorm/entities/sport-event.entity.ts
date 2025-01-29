import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SportEvent {
  @PrimaryGeneratedColumn()
  event_id: number;

  @Column()
  event_name: string;

  @Column({ type: 'float' })
  odds: number;
}
