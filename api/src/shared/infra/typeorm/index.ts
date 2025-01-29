import 'dotenv/config';
import { DataSource } from 'typeorm';

export const DatabaseDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: [
    'src/shared/infra/typeorm/migrations/*.ts',
    'src/shared/infra/typeorm/migrations/seeds/*.ts',
  ],
  logging: true,
  synchronize: true,
});
