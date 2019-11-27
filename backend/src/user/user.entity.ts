// #18
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  user_name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}