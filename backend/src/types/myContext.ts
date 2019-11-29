import { Request, Response } from 'express';
import DataLoader = require('dataloader');
import { PollOption } from 'src/poll/pollOption.entity';

export interface MyContext {
  req: Request,
  res: Response,
  pollOptionLoader: DataLoader<number, PollOption[]>,
}