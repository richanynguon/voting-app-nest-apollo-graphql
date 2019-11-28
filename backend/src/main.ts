import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session'
import { SESSION_SECRET } from './constants';

dotenv.config()
// #1 $ npm i --save @nestjs/graphql apollo-server-express graphql-tools graphql
async function bootstrap() {
  // Creating entry module which points to AppModule
  const app = await NestFactory.create(AppModule);
  app.use(session({
    name: "votingapp",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },

  }))
  // Instaniates server
  await app.listen(3000);
}
bootstrap();
