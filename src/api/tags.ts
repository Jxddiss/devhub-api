import express from 'express';

import { getTagByNameController, getAllTagsController } from '../controllers/tagController';

const router = express.Router();

router.get('/', getAllTagsController);
router.get('/:name', getTagByNameController);

export default router;