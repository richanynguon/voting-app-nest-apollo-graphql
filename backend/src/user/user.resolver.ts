import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'; // #7 import Query 
import { SignUpInput } from './input/user.signupInput';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ErrorResponse } from './shared/errorResponse';
import { LoginInput } from './input/user.loginInput';
import { MyContext } from '../types/myContext';

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
    @Args('signUpInput') signUpInput: SignUpInput
  ): Promise<ErrorResponse[] | null> {// #25
    return this.userService.signup(signUpInput);
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: MyContext
  ): Promise<ErrorResponse[] | null> {
    return this.userService.login(loginInput, ctx.req)
  }

  @Mutation(() => Boolean)
  async logout(
    @Context() ctx: MyContext,
  ) { 
    return this.userService.logout(ctx)
  }
}
