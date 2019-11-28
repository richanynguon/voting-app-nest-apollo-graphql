import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Poll } from './poll.entity';


@Entity('poll')
export class PollOption {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @Column('integer')
  votes: number;

  @Column('integer')
  pollId: number;

  @ManyToOne(() => Poll, poll => poll.pollOption)
  poll: Promise<Poll>;

}