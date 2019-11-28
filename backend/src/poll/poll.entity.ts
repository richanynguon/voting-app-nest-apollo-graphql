import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { User } from '../user/user.entity';
import { PollOption } from './pollOption.entity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('poll')
export class Poll {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('text')
  userId: string;

  @ManyToOne(() => User, user => user.poll)
  user: Promise<User>;
  
  @Field(() => [PollOption])
  @OneToMany(() => PollOption, pollOption => pollOption.poll)
  pollOption: Promise<PollOption[]>;

}