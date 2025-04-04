import express from 'express';
import {
    createCommentController,
    getAllCommentsByProjetController,
    getAllRepliesByCommentIdController,
    getAllCommentsByUserIdController,
    deleteCommentController,
} from "../controllers/commentController"
import { authenticate } from '../middlewares';

const router = express.Router();

router.post('/', authenticate, createCommentController);
router.get('/projet/:id', getAllCommentsByProjetController);
router.get('/replies/:id', getAllRepliesByCommentIdController);
router.get('/user/:id', authenticate, getAllCommentsByUserIdController);
router.delete('/:id', authenticate, deleteCommentController);

export default router;