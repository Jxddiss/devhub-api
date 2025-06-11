import { Request, Response } from 'express';
import admin from 'firebase-admin';
import { AppDataSource } from '../config/ormconfig';
import { User } from '../models/User';
import { signInWithEmail, signUpWithEmail } from '../services/authService';
import {
  generateTokenPair,
  verifyRefreshToken,
} from '../services/tokenService';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const invalidatedTokens: Set<string> = new Set();

export const signUpController = async (req: Request, res: Response) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const firebaseUser = await signUpWithEmail(email, password);

    const userRepository = AppDataSource.getRepository(User);
    const avatar = `https://robohash.org/${encodeURIComponent(username)}.png`;

    const newUser = userRepository.create({
      firstName,
      lastName,
      username,
      email,
      firebaseUid: firebaseUser.user.uid,
      avatar,
    });
    await userRepository.save(newUser);

    const tokenPayload = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      lastName: newUser.lastName,
      firstName: newUser.firstName,
      avatar: newUser.avatar || null,
    };

    const tokens = generateTokenPair(tokenPayload);

    newUser.refreshToken = tokens.refreshToken;
    newUser.refreshTokenExpiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ); // 7 days
    await userRepository.save(newUser);

    res.status(201).json({
      message: 'Utilisateur créé avec succès.',
      user: newUser,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: tokens.expiresAt,
    });
  } catch (error: any) {
    console.error("Erreur lors de l'inscription :", error);

    if (error.code) {
      return res.status(400).json({ message: error.message, code: error.code });
    }

    res.status(500).json({
      message: "Erreur lors de la création de l'utilisateur.",
      error,
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email et mot de passe sont requis.',
    });
  }

  try {
    const firebaseUser = await signInWithEmail(email, password);

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
      firebaseUid: firebaseUser.user.uid,
    });

    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé dans la base de données.',
      });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      avatar: user.avatar || null,
    };

    const tokens = generateTokenPair(tokenPayload);

    user.refreshToken = tokens.refreshToken;
    user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await userRepository.save(user);

    res.status(200).json({
      message: 'Connexion réussie.',
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: tokens.expiresAt,
    });
  } catch (error: any) {
    console.error('Erreur lors de la connexion :', error);

    if (error.code) {
      return res.status(400).json({ message: error.message, code: error.code });
    }

    res.status(500).json({ message: 'Erreur lors de la connexion.', error });
  }
};

export const googleLoginController = async (req: Request, res: Response) => {
  console.log('googleLoginController - Firebase ID Token verification');

  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        message: 'ID token is required',
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const userRepository = AppDataSource.getRepository(User);
    let user = await userRepository.findOneBy({
      firebaseUid: decodedToken.uid,
    });

    if (!user) {
      const email = decodedToken.email || '';
      const username = email.split('@')[0] || `user_${Date.now()}`;
      const avatar =
        decodedToken.picture ||
        `https://robohash.org/${encodeURIComponent(username)}.png`;

      user = userRepository.create({
        firstName: decodedToken.name?.split(' ')[0] || '',
        lastName: decodedToken.name?.split(' ').slice(1).join(' ') || '',
        email,
        username,
        firebaseUid: decodedToken.uid,
        avatar,
      });
      await userRepository.save(user);
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      avatar: user.avatar || null,
    };

    const tokens = generateTokenPair(tokenPayload);

    user.refreshToken = tokens.refreshToken;
    user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await userRepository.save(user);

    res.status(200).json({
      message: 'Connexion réussie.',
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: tokens.expiresAt,
    });
  } catch (error: any) {
    console.error('Firebase ID token verification error:', error);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        message: 'Token expired. Please sign in again.',
      });
    }

    if (error.code === 'auth/invalid-id-token') {
      return res.status(401).json({
        message: 'Invalid token. Please sign in again.',
      });
    }

    res.status(500).json({
      message: 'Erreur lors de la connexion avec Google.',
      error: error.message,
    });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: decoded.id } });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    if (user.refreshTokenExpiresAt && user.refreshTokenExpiresAt < new Date()) {
      user.refreshToken = null;
      user.refreshTokenExpiresAt = null;
      await userRepository.save(user);
      return res.status(401).json({ message: 'Refresh token expired' });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar || null,
    };

    const tokens = generateTokenPair(tokenPayload);

    user.refreshToken = tokens.refreshToken;
    user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await userRepository.save(user);

    res.status(200).json({
      message: 'Token refreshed successfully',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: tokens.expiresAt,
    });
  } catch (error: any) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const { refreshToken } = req.body;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ message: 'Token manquant.' });
  }

  const token = authHeader.split(' ')[1];
  invalidatedTokens.add(token);

  if (refreshToken) {
    try {
      const decoded = verifyRefreshToken(refreshToken);
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: decoded.id } });

      if (user && user.refreshToken === refreshToken) {
        user.refreshToken = null;
        user.refreshTokenExpiresAt = null;
        await userRepository.save(user);
      }
    } catch (error) {
      console.warn('Error cleaning up refresh token during logout:', error);
    }
  }

  res.status(200).json({ message: 'Déconnexion réussie.' });
};

export const isTokenInvalidated = (token: string): boolean => {
  return invalidatedTokens.has(token);
};
