import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// #3 import GrapQLModule
import { GraphQLModule } from "@nestjs/graphql";
import { UserModule } from './user/user.module';
// #13 import TypeOrmModule from
import { TypeOrmModule } from "@nestjs/typeorm";
// #16 import the typeormconfig from config
import { typeOrmConfig } from './config/typeOrmConfig';

// #2 $ npm i type-graphql
@Module({
  imports: [
    // #4 do this code vv
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    // #5 $nest g module user
    // this command will import UserModule and create user folder
    UserModule,
    // #6 $nest g r user --no-spec
    // Will create the resolver boiler for users
    // Insert resolver into modules as provider

    // #14 
    // TypeOrmModule.forRoot({}), 
    // and create a new file in src using config/typeOrmConfig.ts
    // will make file too
    TypeOrmModule.forRoot(typeOrmConfig) // #17 insert typeOrmConfig then create user.entity.ts
  ],
  // Importing app controllers that are the methods and mutations
  // like controllers in express
  controllers: [AppController],
  // Importing app service - contains method and mutation helpers
  // Think models in express
  providers: [AppService],
})
export class AppModule { }
