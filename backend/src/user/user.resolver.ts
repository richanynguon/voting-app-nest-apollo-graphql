import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'; // #7 import Query 
import { SignUpInput } from './input/user.signupInput';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ErrorResponse } from './shared/errorResponse';
import { LoginInput } from './input/user.loginInput';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }
  // #8 Create a @Query that will output a string
  // Create async function hello that can take @Args
  // For now not neccessary and return hello
  // test with npm run start:dev
  // enter into play ground query{ hello}
  /*
  res:
  {
  "data": {
    "hello": "Hello from @Query hello"
    }
  }
  also will create schema.gql
  */
  @Query(() => String)
  async hello() {
    return 'Hello from @Query hello';
  }
  // #21 create mutation passing in arguements that would be recievd in fnx
  @Mutation(() => [ErrorResponse], { nullable: true })
  async signup(
    // #23 import SignupInputs you created 
    // $nest g service user --no-spec
    @Args('SignUpInput') signUpInput: SignUpInput
  ): Promise<ErrorResponse[] | null> {// #25
    return this.userService.signup(signUpInput);
  }

  @Mutation()
  async login(
    @Args('loginInput') loginInput: LoginInput
  ) {
    return this.userService.login(loginInput)
  }
}
