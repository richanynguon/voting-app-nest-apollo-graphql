import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { User } from '../user/user.entity';
import { PollOption } from './pollOption.entity';


@Entity('poll')
export class Poll {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  userId: string;

  @ManyToOne(() => User, user => user.poll)
  user: Promise<User>;

  @OneToMany(() => PollOption, pollOption => pollOption.poll)
  pollOption: Promise<PollOption[]>;

}