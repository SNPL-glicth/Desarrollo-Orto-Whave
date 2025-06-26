"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const developmentConfig = {
    type: 'sqlite',
    database: 'orto_whave_dev.db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
    migrationsRun: false,
};
const productionConfig = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'ortowhave',
    password: process.env.DB_PASSWORD || 'Root1234a',
    database: process.env.DB_DATABASE || 'orto_whave_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    ssl: { rejectUnauthorized: false },
    extra: {
        connectionLimit: 10,
        acquireTimeout: 60000,
        timeout: 60000,
    }
};
exports.databaseConfig = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
//# sourceMappingURL=database.config.js.map