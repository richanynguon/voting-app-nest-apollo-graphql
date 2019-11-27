import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// #1 
async function bootstrap() {
  // Creating entry module which points to AppModule
  const app = await NestFactory.create(AppModule);
  // Instaniates server
  await app.listen(3000);
}
bootstrap();
