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

export const getAllPortfoliosController = async (
  req: Request,
  res: Response,
) => {
  try {
    const portfolios = await getAllPortfolios();
    res.status(200).json(portfolios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getPortfolioByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id);
    const portfolio = await getPortfolioById(id);

    if (!portfolio) {
      return res
        .status(404)
        .json({ error: `Portfolio with id ${id} not found` });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getPortfolioByUserIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = parseInt(req.params.userId);
    const currentUserId = req.user?.id;
    const portfolio = await getPortfolioByUserId(userId);

    if (!portfolio) {
      return res
        .status(404)
        .json({ error: `Portfolio for user ${userId} not found` });
    }

    if (!portfolio.isPublic && portfolio.user.id !== currentUserId) {
      return res
        .status(403)
        .json({ error: 'You do not have permission to view this portfolio' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createPortfolioController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    const portfolioData = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const portfolioWithUser = {
      ...portfolioData,
      user: { id: userId },
    };

    const newPortfolio = await createPortfolio(portfolioWithUser);
    res.status(201).json(newPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updatePortfolioController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user?.id;
    const portfolioData = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const existingPortfolio = await getPortfolioById(id);
    if (!existingPortfolio) {
      return res
        .status(404)
        .json({ error: `Portfolio with id ${id} not found` });
    }

    if (existingPortfolio.user.id !== userId) {
      return res
        .status(403)
        .json({ error: 'You do not have permission to update this portfolio' });
    }

    const updatedPortfolio = await updatePortfolio(id, portfolioData);
    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deletePortfolioController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const existingPortfolio = await getPortfolioById(id);
    if (!existingPortfolio) {
      return res
        .status(404)
        .json({ error: `Portfolio with id ${id} not found` });
    }

    if (existingPortfolio.user.id !== userId) {
      return res
        .status(403)
        .json({ error: 'You do not have permission to delete this portfolio' });
    }

    const result = await deletePortfolio(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const archivePortfolioController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const existingPortfolio = await getPortfolioById(id);
    if (!existingPortfolio) {
      return res
        .status(404)
        .json({ error: `Portfolio with id ${id} not found` });
    }

    if (existingPortfolio.user.id !== userId) {
      return res
        .status(403)
        .json({
          error: 'You do not have permission to archive this portfolio',
        });
    }

    const result = await archivePortfolio(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const restorePortfolioController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const existingPortfolio = await getPortfolioById(id);
    if (!existingPortfolio) {
      return res
        .status(404)
        .json({ error: `Portfolio with id ${id} not found` });
    }

    if (existingPortfolio.user.id !== userId) {
      return res
        .status(403)
        .json({
          error: 'You do not have permission to restore this portfolio',
        });
    }

    const result = await restorePortfolio(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const permaDeletePortfolioController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const existingPortfolio = await getPortfolioById(id);
    if (!existingPortfolio) {
      return res
        .status(404)
        .json({ error: `Portfolio with id ${id} not found` });
    }

    if (existingPortfolio.user.id !== userId) {
      return res
        .status(403)
        .json({
          error:
            'You do not have permission to permanently delete this portfolio',
        });
    }

    const result = await permaDeletePortfolio(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};
