import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config()
// #1 $ npm i --save @nestjs/graphql apollo-server-express graphql-tools graphql
async function bootstrap() {
  // Creating entry module which points to AppModule
  const app = await NestFactory.create(AppModule);
  // Instaniates server
  await app.listen(3000);
}
bootstrap();
