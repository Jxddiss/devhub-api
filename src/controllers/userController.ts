import { Request, Response } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../services/userService';
import { verifyToken } from '../services/tokenService';
import { uploadImageFile } from '../services/uploadService';


export const meController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Non authentifié' });
    }
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const user = await updateUser(Number(req.params.id), req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    await deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUserAvatarController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No token provided in the request headers.');
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    let decodedToken;
    try {
      decodedToken = verifyToken(token);
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }

    if (decodedToken.id !== userId) {
      return res.status(403).json({ error: 'Forbidden: You can only update your own avatar' });
    }

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ error: 'No avatar file uploaded' });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const avatarFile = Array.isArray(req.files.avatar)
      ? req.files.avatar[0]
      : req.files.avatar;
    const fileName = `avatar-${userId}`;

    let avatarUrl = user.avatar;
    try {
      avatarUrl = await uploadImageFile(avatarFile, fileName);
    } catch (error : any) {
      console.error('Error uploading avatar:', error.message);
      if (error.code === 'UNSUPPORTED_IMAGE_FORMAT') {
        return res.status(400).json({ error: 'Unsupported image format' });
      }
      return res.status(500).json({ error: 'Failed to upload avatar' });
    }

    const updatedUser = await updateUser(userId, { avatar: avatarUrl });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUserBannerController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    let decodedToken;
    try {
      decodedToken = verifyToken(token);
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }

    if (decodedToken.id !== userId) {
      return res.status(403).json({ error: 'Forbidden: You can only update your own banner' });
    }

    if (!req.files || !req.files.banner) {
      return res.status(400).json({ error: 'No banner file uploaded' });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const bannerFile = Array.isArray(req.files.banner) 
      ? req.files.banner[0] 
      : req.files.banner;

    const fileName = `banner-${userId}`;

    let bannerUrl = user.banner;
    try {
      bannerUrl = await uploadImageFile(bannerFile, fileName);
    } catch (error : any) {
      console.error('Error uploading banner:', error.message);
      if (error.code === 'UNSUPPORTED_IMAGE_FORMAT') {
        return res.status(400).json({ error: 'Unsupported image format' });
      }
      return res.status(500).json({ error: 'Failed to upload banner' });
    }

    const updatedUser = await updateUser(userId, { banner: bannerUrl });

    res.status(200).json({ message: 'Banner updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getUserByFirstAndLastController = async (req: Request, res: Response) => {
  const { firstName, lastName } = req.params;
  try {
    const users = await getAllUsers();
    const filteredUsers = users.filter(user => {
      return (
        user.firstName.toLowerCase() === firstName.toLowerCase() &&
        user.lastName.toLowerCase() === lastName.toLowerCase()
      );
    });
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};


export const getUserByNameWildCardController = async (req: Request, res: Response) => {
  const { search } = req.params;
  try {
    const users = await getAllUsers();
    const filteredUsers = users.filter(user => {
      return (
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
      );
    });
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};