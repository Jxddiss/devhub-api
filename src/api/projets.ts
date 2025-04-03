import express from 'express';
import { createProjetController, getVideoById, incrementViewCountByOneController } from '../controllers/projetController';
import { getVideosFromUser } from '../controllers/projetController';
import { authenticate } from '../middlewares';



const router = express.Router();

router.post('/', authenticate, createProjetController);
router.get('/user/:id', getVideosFromUser);
router.get('/:id' , getVideoById);
router.put('/view/:id', incrementViewCountByOneController);


export default router;