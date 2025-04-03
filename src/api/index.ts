import express from 'express';
import users from './users';
import emojis from './emojis';
import auth from './auth';
import projets from './projets';
import tags from './tags';
import courses from './courses';

const router = express.Router();

router.use('/users', users);
router.use('/projects', projets);
router.use('/emojis', emojis);
router.use('/auth', auth);
router.use('/tags', tags);
router.use('/courses', courses);

export default router;