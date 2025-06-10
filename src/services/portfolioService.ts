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
