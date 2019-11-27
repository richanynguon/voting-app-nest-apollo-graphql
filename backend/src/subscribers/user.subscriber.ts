import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { User } from "../user/user.entity";
import * as bcrypt from 'bcryptjs';
// #27
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User>{

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    console.log(`BEFORE POST INSERTED `, event.entity);
    event.entity.password = bcrypt
  }

}