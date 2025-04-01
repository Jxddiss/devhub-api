import express from 'express';
import { createProjetController } from '../controllers/projetController';
import { authenticate } from '../middlewares';


const router = express.Router();

router.post('/', authenticate, createProjetController);

export default router;