import { Request, Response } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../services/userService';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const user = await updateUser(Number(req.params.id), req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    await deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};