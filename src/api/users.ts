import express from 'express';
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByFirstAndLastController,
  getUserByIdController,
  getUserByNameWildCardController,
  updateUserAvatarController,
  updateUserBannerController,
  updateUserController,
} from '../controllers/userController';
import { authenticate } from '../middlewares';

const router = express.Router();

router.post('/', createUserController);

router.get('/', getAllUsersController);
router.get('/:id', getUserByIdController);
router.get('/name/:firstName/:lastName', getUserByFirstAndLastController);
router.get('/name/:search', getUserByNameWildCardController);

router.put('/:id', authenticate, updateUserController);
router.put('/:id/banner', authenticate, updateUserBannerController);
router.put('/:id/avatar', authenticate, updateUserAvatarController);

router.delete('/:id', authenticate, deleteUserController);

export default router;
