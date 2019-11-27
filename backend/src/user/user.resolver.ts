import { Resolver, Query } from '@nestjs/graphql'; // #7 import Query 

@Resolver('User')
export class UserResolver {
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

}
