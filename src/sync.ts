import 'reflect-metadata';
import { AppDataSource } from './config/ormconfig';
import { User } from './models/User';

const syncDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully.');
    const userRepository = AppDataSource.getRepository(User);

    const existingUsers = await userRepository.count();
    if (existingUsers === 0) {
      const defaultUsers = [
        {
          lastName: 'Doe',
          firstName: 'John',
          username: 'johndoe',
          email: 'johndoe@example.com',
          avatar: undefined,
          banner: undefined,
          isLocked: false,
          isBanned: false,
        },
        {
          lastName: 'Smith',
          firstName: 'Jane',
          username: 'janesmith',
          email: 'janesmith@example.com',
          avatar: undefined,
          banner: undefined,
          isLocked: false,
          isBanned: false,
        },
        {
          lastName: 'Brown',
          firstName: 'Charlie',
          username: 'charliebrown',
          email: 'charliebrown@example.com',
          avatar: undefined,
          banner: undefined,
          isLocked: false,
          isBanned: false,
        },
      ];
      await userRepository.save(defaultUsers);
      console.log('Default users created successfully.');
    } else {
      console.log('Users already exist. Skipping default user creation.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await AppDataSource.destroy();
  }
};

syncDatabase();