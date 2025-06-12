import {
  addFavorite,
  getFavoritesByUserId,
  isProjectFavoritedByUser,
  removeFavorite,
} from '../services/favoriteService';

export const addFavoriteController = async (req: any, res: any) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { projectId } = req.body;
  if (!projectId) {
    return res.status(400).json({ error: 'Project id is required' });
  }

  try {
    const favorite = await addFavorite(req.user.id, projectId);
    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const removeFavoriteController = async (req: any, res: any) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { projectId } = req.body;
  if (!projectId) {
    return res.status(400).json({ error: 'Project id is required' });
  }

  try {
    await removeFavorite(req.user.id, projectId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getFavoritesByUserIdController = async (req: any, res: any) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const favorites = await getFavoritesByUserId(req.user.id);
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const isProjectFavoritedByUserController = async (
  req: any,
  res: any
) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { projectId } = req.query;
  console.log('Checking if project is favorited by user:', projectId);
  if (!projectId) {
    return res.status(400).json({ error: 'Project id is required' });
  }

  try {
    const isFavorited = await isProjectFavoritedByUser(
      req.user.id,
      parseInt(projectId as string)
    );
    res.status(200).json({ isFavorited });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};
