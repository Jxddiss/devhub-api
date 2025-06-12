import express from 'express';
import {
  addFavoriteController,
  getFavoritesByUserIdController,
  isProjectFavoritedByUserController,
  removeFavoriteController,
} from '../controllers/favoriteController';
import { authenticate } from '../middlewares';

const router = express.Router();

router.post('/', authenticate, addFavoriteController);
router.delete('/', authenticate, removeFavoriteController);
router.get('/user', authenticate, getFavoritesByUserIdController);
router.get('/is-favorited', authenticate, isProjectFavoritedByUserController);

export default router;
