import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PollRepository } from './poll.repository';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(PollRepository)
    private readonly userRepo: PollRepository
  ) { }

  async createPoll(
    userId: string,
    name: string,
    option: string[]
  ): Promise<Boolean> {
    return true;
  }
}
