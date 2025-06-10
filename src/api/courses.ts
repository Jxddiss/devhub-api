import express from 'express';

import { getAllCoursesController } from '../controllers/courseController';

const router = express.Router();

router.get('/', getAllCoursesController);

export default router;
