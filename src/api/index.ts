import express from 'express';
import auth from './auth';
import comments from './comments';
import courses from './courses';
import emojis from './emojis';
import favorites from './favorites';
import portfolios from './portfolios';
import projets from './projets';
import tags from './tags';
import users from './users';

const router = express.Router();

router.use('/users', users);
router.use('/projects', projets);
router.use('/emojis', emojis);
router.use('/auth', auth);
router.use('/tags', tags);
router.use('/courses', courses);
router.use('/comments', comments);
router.use('/portfolios', portfolios);
router.use('/favorites', favorites);

export default router;
