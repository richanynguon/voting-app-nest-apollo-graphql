import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// #3 import GrapQLModule
import { GraphQLModule } from "@nestjs/graphql"; 
import { UserModule } from './user/user.module';


// #2 $ npm i type-graphql
@Module({
  imports: [
    // #4 do this code vv
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    // #5 $nest g module user
    // this command will import UserModule and create user folder
    UserModule,  
    // #6 $nest g r user --no-spec
    // Will create the resolver boiler for users
    // Insert resolver into modules as provider
  ],
  // Importing app controllers that are the methods and mutations
  // like controllers in express
  controllers: [AppController],
  // Importing app service - contains method and mutation helpers
  // Think models in express
  providers: [AppService],
})
export class AppModule {}
