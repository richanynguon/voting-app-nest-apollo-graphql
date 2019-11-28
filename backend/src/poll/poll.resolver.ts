import { Resolver, Mutation, Context } from '@nestjs/graphql';
import { MyContext } from 'src/types/myContext';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Resolver('Poll')
export class PollResolver {

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async createPoll() {
    return true;

  }
}
