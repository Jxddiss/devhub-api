import express from 'express';
import users from './users';
import emojis from './emojis';
import auth from './auth';
import projets from './projets';

const router = express.Router();

router.use('/users', users);
router.use('/projects', projets);
router.use('/emojis', emojis);
router.use('/auth', auth);

export default router;