import { Resolver, Mutation, Context, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { GetUserId } from './getUserId.decorator';
import { CreatePollArgs } from './args/createPollArgs.args';
import { PollService } from './poll.service';
import { MyContext } from '../types/myContext';
import { Poll } from './poll.entity';
import { AllPollsArgs } from './args/allPollsArgs.args';

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

  @Query(() => Poll)
  async poll(@Args('id') id: number): Promise<Poll> {
    return this.pollService.poll(id)
  }

  @Query(() => [Poll])
  async allPolls(@Args() { take, skip }: AllPollsArgs): Promise<Poll[]> {
    return this.pollService.allPolls(take, skip)
  }

  @Mutation(() => Boolean)
  async deletePoll(
    @Context() context: MyContext,
    @Args('id') id: number,
  ): Promise<Boolean> {
    return this.pollService.deletePoll(context, id)

  }

}
