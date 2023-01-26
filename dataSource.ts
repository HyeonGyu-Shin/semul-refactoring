import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/users/entity/users.entity';
import { UsersProfile } from './src/users/entity/usersProfile.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [User, UsersProfile],
  migrations: [__dirname + '/src/migrations/*.ts'],
  logging: true,
  synchronize: false,
});

export default dataSource;
