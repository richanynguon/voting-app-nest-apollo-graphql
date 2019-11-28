import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Poll } from './poll.entity';
@ObjectType()
@Entity()
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
  @Column()
  pollId: number;

  @ManyToOne(() => Poll, poll => poll.pollOption, { onDelete: "CASCADE" })
  poll: Promise<Poll>;

}

