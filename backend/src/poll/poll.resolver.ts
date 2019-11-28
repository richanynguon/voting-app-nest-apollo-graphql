import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { MyContext } from 'src/types/myContext';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { GetUserId } from './getUserId.decorator';
import { CreatePollArgs } from './args/createPollArgs.args';
import { PollService } from './poll.service';

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
}
