import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { Poll } from './poll.entity';


@Entity('poll')
export class PollOption{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Poll, poll => poll.options)
  poll: Promise<Poll[]>;

}