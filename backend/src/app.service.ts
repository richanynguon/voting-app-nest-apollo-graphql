import { Injectable } from '@nestjs/common';

// Like models in express connects CRUD func with db response
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
