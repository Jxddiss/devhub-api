import express from 'express';
import {
  createProjetController,
  decrementLikeCountByOneController,
  getAllProjetsController,
  getProjetsByCollaboratorController,
  getProjetsByCourseController,
  getProjetsBySessionController,
  getProjetsByTagsController,
  getProjetsByTagsListController,
  getProjetsByTeacherController,
  getProjetsByTitleController,
  getVideoById,
  getVideosFromUser,
  incrementLikeCountByOneController,
  incrementViewCountByOneController,
} from '../controllers/projetController';
import { authenticate } from '../middlewares';

const router = express.Router();

router.post('/', authenticate, createProjetController);
router.get('/', getAllProjetsController);
router.get('/search/:title', getProjetsByTitleController);
router.get('/tags/:tags', getProjetsByTagsListController);
router.get('/teacher/:teacher', getProjetsByTeacherController);
router.get('/course/:course', getProjetsByCourseController);
router.get('/session/:session', getProjetsBySessionController);
router.get('/collaborator/:collaborator', getProjetsByCollaboratorController);
router.get('/user/:id', getVideosFromUser);
router.get('/recommended', getProjetsByTagsController);
router.get('/:id', getVideoById);
router.put('/view/:id', incrementViewCountByOneController);
router.put('/like/:id', incrementLikeCountByOneController);
router.put('/dislike/:id', decrementLikeCountByOneController);

export default router;
