import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'ortowhave',
  password: process.env.DB_PASSWORD || 'Root1234a',
  database: process.env.DB_DATABASE || 'orto_whave_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // Mantener en false para producción
  migrationsRun: true,
  logging: process.env.NODE_ENV === 'development', // Solo log en desarrollo
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  extra: {
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
  }
};
