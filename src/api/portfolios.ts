import express from 'express';
import {
  archivePortfolioController,
  createPortfolioController,
  deletePortfolioController,
  getAllPortfoliosController,
  getPortfolioByIdController,
  getPortfolioByUserIdController,
  permaDeletePortfolioController,
  restorePortfolioController,
  updatePortfolioController,
} from '../controllers/portfolioController';
import { authenticate } from '../middlewares';

const router = express.Router();

router.get('/', authenticate, getAllPortfoliosController);
router.get('/:id', authenticate, getPortfolioByIdController);
router.get('/user/:userId', authenticate, getPortfolioByUserIdController);
router.post('/', authenticate, createPortfolioController);
router.put('/:id', authenticate, updatePortfolioController);
router.delete('/:id', authenticate, deletePortfolioController);
router.put('/archive/:id', authenticate, archivePortfolioController);
router.put('/restore/:id', authenticate, restorePortfolioController);
router.delete(
  '/perma-delete/:id',
  authenticate,
  permaDeletePortfolioController,
);

export default router;
