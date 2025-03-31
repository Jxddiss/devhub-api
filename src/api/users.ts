import express from 'express';
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  updateUserAvatarController,
  updateUserBannerController,
} from '../controllers/userController';

const router = express.Router();

// Créer un utilisateur
router.post('/', createUserController);

// Obtenir tous les utilisateurs
router.get('/', getAllUsersController);

// Obtenir un utilisateur par son ID
router.get('/:id', getUserByIdController);

// Mettre à jour un utilisateur
router.put('/:id', updateUserController);

// Supprimer un utilisateur
router.delete('/:id', deleteUserController);

router.put("/:id/avatar", updateUserAvatarController);

// Route to update banner
router.put("/:id/banner", updateUserBannerController);

export default router;