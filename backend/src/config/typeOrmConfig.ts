import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// #15
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'creator',
  password: 'creator',
  database: 'votingapp',
  entities: [],
  synchronize: true,
}