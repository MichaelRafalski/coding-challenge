import { DataSource } from 'typeorm';
import { GpsPosition } from './src/database/gps-position.entity';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [GpsPosition],
    synchronize: false,
    migrations: ['src/database/migrations/*.ts'],
});
