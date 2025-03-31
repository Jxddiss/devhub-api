import { Request, Response } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../services/userService';
import fs from "fs";
import path from "path";
import { verifyToken } from "../services/tokenService";


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

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No token provided in the request headers.");
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = verifyToken(token);
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    }

    if (decodedToken.id !== userId) {
      return res.status(403).json({ error: "Forbidden: You can only update your own avatar" });
    }

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ error: "No avatar file uploaded" });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const avatarFile = req.files.avatar as any;
    const uploadDir = path.join(__dirname, "../uploads/avatars");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const avatarPath = path.join(uploadDir, `${user.username}.png`);

    if (fs.existsSync(avatarPath)) {
      fs.unlinkSync(avatarPath);
    }

    fs.writeFileSync(avatarPath, avatarFile.data);

    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/avatars/${user.username}.png`;

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
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = verifyToken(token);
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    }

    if (decodedToken.id !== userId) {
      return res.status(403).json({ error: "Forbidden: You can only update your own banner" });
    }

    if (!req.files || !req.files.banner) {
      return res.status(400).json({ error: "No banner file uploaded" });
    }

    const bannerFile = req.files.banner as any;
    const uploadDir = path.join(__dirname, "../uploads/banners");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const bannerPath = path.join(uploadDir, `${userId}-banner.png`);

    if (fs.existsSync(bannerPath)) {
      fs.unlinkSync(bannerPath);
    }

    fs.writeFileSync(bannerPath, bannerFile.data);

    const bannerUrl = `${req.protocol}://${req.get("host")}/uploads/banners/${userId}-banner.png`;

    const updatedUser = await updateUser(userId, { banner: bannerUrl });

    res.status(200).json({ message: "Banner updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};