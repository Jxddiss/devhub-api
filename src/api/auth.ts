import express from 'express';
import { logoutController, signUpController, loginController, googleLoginController } from '../controllers/authController';
import { authenticate } from '../middlewares';

const router = express.Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
router.post('/google-login', googleLoginController);
router.post('/logout', authenticate, logoutController);

export default router;