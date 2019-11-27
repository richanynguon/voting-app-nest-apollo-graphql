import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// #2
@Module({
  imports: [],
  // Importing app controllers that are the methods and mutations
  // like controllers in express
  controllers: [AppController],
  // Importing app service - contains method and mutation helpers
  // Think models in express
  providers: [AppService],
})
export class AppModule {}
