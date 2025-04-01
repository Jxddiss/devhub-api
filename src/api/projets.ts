import express from 'express';
import { uploadVideoDemoController } from '../controllers/projetController';


const router = express.Router();

router.post('/', uploadVideoDemoController);

export default router;