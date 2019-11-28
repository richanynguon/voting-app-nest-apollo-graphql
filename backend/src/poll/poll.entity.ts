import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { User } from '../user/user.entity';
import { PollOption } from './pollOption.entity';


@Entity('poll')
export class Poll {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => PollOption, pollOption => pollOption.poll)
  options: Promise<PollOption[]>;

  @OneToOne(() => User, user => user.poll)
  user: Promise<User>;


}