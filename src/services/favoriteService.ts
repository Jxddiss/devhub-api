import { AppDataSource } from '../config/ormconfig';
import { Favorite } from '../models/Favorite';

const favoriteRepository = AppDataSource.getRepository(Favorite);

export const addFavorite = async (userId: number, projectId: number) => {
  const favorite = favoriteRepository.create({
    user: { id: userId },
    projectId,
  });
  return favoriteRepository.save(favorite);
};

export const removeFavorite = async (userId: number, projectId: number) => {
  const favorite = await favoriteRepository.findOne({
    where: { user: { id: userId }, projectId },
  });
  if (!favorite) throw new Error('Favorite not found');
  return favoriteRepository.remove(favorite);
};

export const getFavoritesByUserId = async (userId: number) => {
  return favoriteRepository.find({
    where: { user: { id: userId } },
    relations: ['user'],
  });
};

export const isProjectFavoritedByUser = async (
  userId: number,
  projectId: number
) => {
  const favorite = await favoriteRepository.findOne({
    where: { user: { id: userId }, projectId },
  });
  return !!favorite;
};
