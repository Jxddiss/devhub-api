import express from 'express';

import { getAllTagsController, getTagByNameController } from '../controllers/tagController';

const router = express.Router();

router.get('/', getAllTagsController);
router.get('/:name', getTagByNameController);

export default router;
