import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// #3
import { GraphQLModule } from "@nestjs/graphql"; 
import { UserModule } from './user/user.module';


// #2
@Module({
  imports: [
    // #4
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    // #5 $nest g module user
    // this command will import UserModule and create user folder
    UserModule,  
    
  ],
  // Importing app controllers that are the methods and mutations
  // like controllers in express
  controllers: [AppController],
  // Importing app service - contains method and mutation helpers
  // Think models in express
  providers: [AppService],
})
export class AppModule {}
