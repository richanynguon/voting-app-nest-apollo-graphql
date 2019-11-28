import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PollRepository, PollOptionRepository } from './poll.repository';

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
      where: { id: poll.raw[0].id }, // ?? because of save to insert?
      relations: ['pollOption']
    })
    console.log(newPoll)
    return true;
  }
}
