import { AppDataSource } from '../config/ormconfig';
import { Portfolio } from '../models/Portfolio';

const portfolioRepository = AppDataSource.getRepository(Portfolio);

export const getAllPortfolios = async () => {
  return portfolioRepository.find();
};

export const getPortfolioById = async (id: number) => {
  return portfolioRepository.findOneBy({ id });
};

export const getPortfolioByUserId = async (userId: number) => {
  return portfolioRepository.findOneBy({ user: { id: userId } });
};

export const createPortfolio = async (portfolioData: Partial<Portfolio>) => {
  const portfolio = portfolioRepository.create(portfolioData);
  return portfolioRepository.save(portfolio);
};

export const updatePortfolio = async (id: number, portfolioData: Partial<Portfolio>) => {
  await portfolioRepository.update(id, portfolioData);
  return getPortfolioById(id);
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
