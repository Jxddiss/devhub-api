import { Router } from 'express';
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from '../controllers/userController';

const router = Router();

// créer utilisateur
router.post('/users', createUserController);

// obtenir tous les utilisateurs
router.get('/users', getAllUsersController);

// obtenir un utilisateur par son id
router.get('/users/:id', getUserByIdController);

// mettre à jour un utilisateur
router.put('/users/:id', updateUserController);

// suprrimer un utilisateur
router.delete('/users/:id', deleteUserController);

export default router;