import { Request, Response } from 'express';
import {
  archivePortfolio,
  createPortfolio,
  deletePortfolio,
  getAllPortfolios,
  getPortfolioById,
  getPortfolioByUserId,
  permaDeletePortfolio,
  restorePortfolio,
  updatePortfolio,
} from '../services/portfolioService';

export const getAllPortfoliosController = async (req: Request, res: Response) => {
  try {
    const portfolios = await getAllPortfolios();
    res.status(200).json(portfolios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getPortfolioByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const portfolio = await getPortfolioById(id);
    
    if (!portfolio) {
      return res.status(404).json({ error: `Portfolio with id ${id} not found` });
    }
    
    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getPortfolioByUserIdController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const portfolio = await getPortfolioByUserId(userId);
    
    if (!portfolio) {
      return res.status(404).json({ error: `Portfolio for user ${userId} not found` });
    }
    
    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createPortfolioController = async (req: Request, res: Response) => {
  try {
    const portfolioData = req.body;
    const newPortfolio = await createPortfolio(portfolioData);
    res.status(201).json(newPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updatePortfolioController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const portfolioData = req.body;
    const updatedPortfolio = await updatePortfolio(id, portfolioData);
    
    if (!updatedPortfolio) {
      return res.status(404).json({ error: `Portfolio with id ${id} not found` });
    }
    
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deletePortfolioController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await deletePortfolio(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const archivePortfolioController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await archivePortfolio(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const restorePortfolioController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await restorePortfolio(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const permaDeletePortfolioController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await permaDeletePortfolio(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};
