import express from 'express';
import users from './users';
import emojis from './emojis';

const router = express.Router();


router.use('/users', users);
router.use('/emojis', emojis);

export default router;