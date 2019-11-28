// #18
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Poll } from '../poll/poll.entity'

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_name: string;

  @Column()
  email: string;

  @Column()
  password: string;
  // todo Make false for production
  @Column({ default: true})
  confirmed: boolean;

  @OneToMany(() => Poll, poll => poll.user)
  poll: Promise<Poll[]>
}