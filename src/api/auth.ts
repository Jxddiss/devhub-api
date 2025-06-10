import express from 'express';
import { googleLoginController, loginController, logoutController, signUpController } from '../controllers/authController';
import { meController } from '../controllers/userController';
import { authenticate } from '../middlewares';

const router = express.Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
router.post('/google-login', googleLoginController);
router.post('/logout', authenticate, logoutController);
router.get('/me', authenticate, meController);

export default router;
