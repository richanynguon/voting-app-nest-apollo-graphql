import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session'
import { SESSION_SECRET } from './constants';
import * as Store from 'connect-redis';
import { redis } from './redis';


dotenv.config()
// #1 $ npm i --save @nestjs/graphql apollo-server-express graphql-tools graphql
async function bootstrap() {
  // Creating entry module which points to AppModule
  const RedisStore = Store(session);
  const app = await NestFactory.create(AppModule);
  app.use(session({
    store: new RedisStore({
      client: redis as any,
    }),
    name: "votingapp",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 *365,

    },

  }))
  // Instaniates server
  await app.listen(3000);
}
bootstrap();
