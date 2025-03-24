import app from './app';
import { AppDataSource } from './config/ormconfig';

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully.');

    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  }
};

startServer();
