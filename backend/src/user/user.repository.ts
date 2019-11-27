import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

// #19 create user.repository.ts ctrl spc will import things

@EntityRepository(User)
export class UserRepository extends Repository<User>{

}