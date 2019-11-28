import { Injectable, NotFoundException } from '@nestjs/common';
import { SignUpInput } from './input/user.signupInput';
import { UserRepository } from './user.repository';
import { ErrorResponse } from './shared/errorResponse';
import { InjectRepository } from '@nestjs/typeorm';
import { sendEmail } from '../utils/sendEmail';
import { confirmEmailLink } from '../utils/confirmEmailLink';
import { redis } from '../redis';
import { Response, Request } from 'express';
import { CONFRIM_EMAIL_PREFIX } from '../constants';
import { LoginInput } from './input/user.loginInput';
import * as bcrypt from 'bcryptjs';
import { errorMessage } from './shared/errorMessage';
import { MyContext } from 'src/types/myContext';
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
      return errorMessage("email", "account already created");
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

  async login(loginInput: LoginInput, req: Request): Promise<ErrorResponse[] | null> {
    const user = await this.userRepo.findOne({
      where: { email: loginInput.email }
    })
    if (!user) {
      return errorMessage("email", "invalid email or password");
    }
    if (user.confirmed === false) {
      return errorMessage("email", "confirm email");
    }
    const checkPassword = await bcrypt.compare(loginInput.password, user.password)
    if (!checkPassword) {
      return errorMessage("email", "invalid email or password");
    }
    req.session.userID = user.id;
    return null;
  }

  async logout(context: MyContext) {
    await context.req.session.destroy(err => {
      console.log(err)
      return false;
    })
    await context.res.clearCookie("votingapp");
    return true;
  }
}
