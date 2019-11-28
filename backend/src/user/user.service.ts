import { Injectable, NotFoundException } from '@nestjs/common';
import { SignUpInput } from './input/signupInput';
import { UserRepository } from './user.repository';
import { ErrorResponse } from './shared/errorResponse';
import { InjectRepository } from '@nestjs/typeorm';
import { sendEmail } from '../utils/sendEmail';
import { confirmEmailLink } from '../utils/confirmEmailLink';
import { redis } from '../redis';
import { Response } from 'express';
import { CONFRIM_EMAIL_PREFIX } from '../constants';
// #24
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository
  ) { }
  async signup(SignUpInput: SignUpInput): Promise<ErrorResponse[] | null> {
    const userExist = await this.userRepo.findOne({ where: { email: SignUpInput.email } });
    if (userExist) {
      return [
        {
          path: "email",
          message: "An account already exists with that email"
        }
      ]
    }
    const user = await this.userRepo.save({ ...SignUpInput })
    await sendEmail(SignUpInput.email, await confirmEmailLink(user.id))
    return null;
  }

  async confirmEmail(id: string, res: Response) {
    const userID = await redis.get(`${CONFRIM_EMAIL_PREFIX}${id}`);
    if (!userID) {
      throw new NotFoundException();
    }
    this.userRepo.update({ id: userID }, { confirmed: true })
    res.send('ok');
  }
}
