import { Injectable } from '@nestjs/common';
import { SignUpInput } from './input/signupInput';
import { UserRepository } from './user.repository';
import { ErrorResponse } from './shared/errorResponse';
import { InjectRepository } from '@nestjs/typeorm';
import { sendEmail } from '../utils/sendEmail';
import { confirmEmailLink } from '../utils/confirmEmailLink';
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
}
