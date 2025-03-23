import { AppDataSource } from '../config/ormconfig';
import { User } from '../models/User';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (data: Partial<User>) => {
  const user = userRepository.create(data);
  return userRepository.save(user);
};

export const getAllUsers = async () => {
  return userRepository.find();
};

export const getUserById = async (id: number) => {
  return userRepository.findOneBy({ id });
};

export const updateUser = async (id: number, data: Partial<User>) => {
  const user = await userRepository.findOneBy({ id });
  if (!user) throw new Error('User not found');
  Object.assign(user, data);
  return userRepository.save(user);
};

export const deleteUser = async (id: number) => {
  const user = await userRepository.findOneBy({ id });
  if (!user) throw new Error('User not found');
  return userRepository.remove(user);
};