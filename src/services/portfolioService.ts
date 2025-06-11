import { AppDataSource } from '../config/ormconfig';
import { Portfolio } from '../models/Portfolio';

const portfolioRepository = AppDataSource.getRepository(Portfolio);

export const getAllPortfolios = async () => {
  return portfolioRepository.find();
};

export const getPortfolioById = async (id: number) => {
  return portfolioRepository.findOne({
    where: { id, status: 'active' },
    relations: ['user', 'projets'],
  });
};

export const getPortfolioByUserId = async (userId: number) => {
  return portfolioRepository.findOne({
    where: { user: { id: userId }, status: 'active' },
    relations: ['user'],
  });
};

export const createPortfolio = async (portfolioData: Partial<Portfolio>) => {
  const userId = portfolioData.user?.id;

  if (!userId) {
    throw new Error('User ID is required to create a portfolio');
  }

  const existingPortfolio = await portfolioRepository.findOne({
    where: { user: { id: userId } },
    relations: ['user'],
  });

  if (existingPortfolio) {
    if (existingPortfolio.status !== 'active') {
      existingPortfolio.status = 'active';
      Object.assign(existingPortfolio, portfolioData);
      return portfolioRepository.save(existingPortfolio);
    } else {
      throw new Error('User already has an active portfolio');
    }
  }

  const portfolio = portfolioRepository.create({
    ...portfolioData,
    status: 'active',
  });
  return portfolioRepository.save(portfolio);
};

export const updatePortfolio = async (
  id: number,
  portfolioData: Partial<Portfolio>,
) => {
  const portfolio = await portfolioRepository.findOne({
    where: { id, status: 'active' },
    relations: ['user', 'projets'],
  });

  if (!portfolio) {
    throw new Error(`Portfolio with id ${id} not found`);
  }

  // Update the portfolio with new data
  Object.assign(portfolio, portfolioData);

  return portfolioRepository.save(portfolio);
};
export const deletePortfolio = async (id: number) => {
  const portfolio = await getPortfolioById(id);
  if (!portfolio) {
    throw new Error(`Portfolio with id ${id} not found`);
  }

  portfolio.status = 'deleted';
  return portfolioRepository.save(portfolio);
};

export const archivePortfolio = async (id: number) => {
  const portfolio = await getPortfolioById(id);
  if (!portfolio) {
    throw new Error(`Portfolio with id ${id} not found`);
  }

  portfolio.status = 'archived';
  return portfolioRepository.save(portfolio);
};

export const restorePortfolio = async (id: number) => {
  const portfolio = await getPortfolioById(id);
  if (!portfolio) {
    throw new Error(`Portfolio with id ${id} not found`);
  }

  portfolio.status = 'active';
  return portfolioRepository.save(portfolio);
};

export const permaDeletePortfolio = async (id: number) => {
  const portfolio = await getPortfolioById(id);
  if (!portfolio) {
    throw new Error(`Portfolio with id ${id} not found`);
  }

  await portfolioRepository.delete(id);
  return { message: `Portfolio with id ${id} has been permanently deleted` };
};
