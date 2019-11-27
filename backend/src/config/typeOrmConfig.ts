import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// #15
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'creator',
  password: 'creator',
  database: 'votingapp',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  // #27
  subscribers:[__dirname + '/../subscribers/*.subscriber{.ts,.js}'],
  
}