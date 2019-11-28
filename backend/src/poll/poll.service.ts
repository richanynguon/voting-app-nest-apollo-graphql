import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PollRepository, PollOptionRepository } from './poll.repository';
import { MyContext } from '../types/myContext';
import { redis } from '../redis';
import { POLL_OPTION_ID_PREFIX } from '../constants';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(PollRepository)
    private readonly pollRepo: PollRepository,

    @InjectRepository(PollOptionRepository)
    private readonly pollOptionRepo: PollOptionRepository,
  ) { }

  async createPoll(
    userId: string,
    name: string,
    options: string[]
  ): Promise<Boolean> {
    const poll = await this.pollRepo.insert({
      name,
      userId,
    })
    options.map(async (text) => {
      await this.pollOptionRepo.insert({
        text,
        votes: 0,
        pollId: poll.raw[0].id,
      });
    });

    // checks if poll is there
    const newPoll = await this.pollRepo.findOne({
      where: { id: poll.raw[0].id }, // raw[0].id instead if just of pollid?? because of save to insert?
      relations: ['pollOption']
    })
    console.log(newPoll)
    return true;
  }

  async vote(context: MyContext, pollOptionId: number): Promise<Boolean> {
    const pollOption = await this.pollOptionRepo.findOne({
      where: { id: pollOptionId },
    })

    const ip =
      context.req.header('x-forwarded-for') || context.req.connection.remoteAddress;

    if (ip) {
      const hasIp = await redis.sismember(
        `${POLL_OPTION_ID_PREFIX}${pollOption.pollId}`, ip
      );
      if (hasIp) {
        return false
      }
    }

    await this.pollOptionRepo.update(
      { id: pollOptionId },
      { votes: pollOption.votes + 1 }
    );

    await redis.sadd(
      `${POLL_OPTION_ID_PREFIX}${pollOption.pollId}`, ip
    );
    return true;
  }

}
