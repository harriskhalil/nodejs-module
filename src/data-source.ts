import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE}?authSource=admin`,
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
