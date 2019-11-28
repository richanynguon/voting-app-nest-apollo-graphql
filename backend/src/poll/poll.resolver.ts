import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { GetUserId } from './getUserId.decorator';
import { CreatePollArgs } from './args/createPollArgs.args';
import { PollService } from './poll.service';
import { MyContext } from '../types/myContext';

@Resolver('Poll')
export class PollResolver {
  constructor(private readonly pollService: PollService) { }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async createPoll(
    @GetUserId() userId: string,
    @Args() { name, options }: CreatePollArgs
  ): Promise<Boolean> {
    return this.pollService.createPoll(userId, name, options)
  }

  @Mutation(() => Boolean)
  async vote(
    @Context() context: MyContext,
    @Args('pollOptionId') pollOptionId: number,
  ): Promise<Boolean> {
    return this.pollService.vote(context, pollOptionId)
  }
}
