import 'reflect-metadata';
import { AppDataSource } from './config/ormconfig';
import { User } from './models/User';

const syncDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await AppDataSource.destroy();
  }
};

syncDatabase();