// #22 create input folder and signupinput.ts
import { InputType, Field } from "type-graphql";
import { User } from "../user.entity";

@InputType()
export class SignUpInput implements Partial<User>{
  @Field()
  user_name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}