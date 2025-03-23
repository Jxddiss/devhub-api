import express from 'express';
import { signUpController, loginController, googleLoginController } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
router.post("/google-login", googleLoginController);

export default router;