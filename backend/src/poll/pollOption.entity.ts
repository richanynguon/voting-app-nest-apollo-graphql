import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Poll } from './poll.entity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('poll')
export class PollOption {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column('text')
  text: string;
  @Field()
  @Column('integer')
  votes: number;
  @Field()
  @Column('integer')
  pollId: number;

  @ManyToOne(() => Poll, poll => poll.pollOption)
  poll: Promise<Poll>;

}