import { Request, Response } from "express";

import { signUpWithEmail } from "../services/authService";
import { signInWithEmail } from "../services/authService";

import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

import { AppDataSource } from "../config/ormconfig";
import { User } from "../models/User";

//Inscription
export const signUpController = async (req: Request, res: Response) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const firebaseUser = await signUpWithEmail(email, password);

    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create({
      firstName,
      lastName,
      username,
      email,
      firebaseUid: firebaseUser.user.uid,
    });
    await userRepository.save(newUser);

    res
      .status(201)
      .json({ message: "Utilisateur créé avec succès.", user: newUser });
  } catch (error: any) {
    console.error("Erreur lors de l'inscription :", error);

    if (error.code) {
      return res.status(400).json({ message: error.message, code: error.code });
    }

    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur.", error });
  }
};

//Connexion avec email et mot de passe
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email et mot de passe sont requis." });
  }

  try {
    const firebaseUser = await signInWithEmail(email, password);

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({
      firebaseUid: firebaseUser.user.uid,
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Utilisateur non trouvé dans la base de données." });
    }
    res.status(204).json({ message: "Connexion réussie.", user });
  } catch (error: any) {
    console.error("Erreur lors de la connexion :", error);

    if (error.code) {
      return res.status(400).json({ message: error.message, code: error.code });
    }

    res.status(500).json({ message: "Erreur lors de la connexion.", error });
  }
};

//Inscription et connexion avec Google
export const googleLoginController = async (req: Request, res: Response) => {
  console.log("googleLoginController");
  try {
    const { idToken } = req.body;

    const credential = GoogleAuthProvider.credential(idToken);
    const firebaseUser = await signInWithCredential(auth, credential);

    const userRepository = AppDataSource.getRepository(User);
    let user = await userRepository.findOneBy({
      firebaseUid: firebaseUser.user.uid,
    });

    if (!user) {
      const email = firebaseUser.user.email || "";
      const username = email.split("@")[0] || `user_${Date.now()}`;

      user = userRepository.create({
        firstName: firebaseUser.user.displayName?.split(" ")[0] || "",
        lastName: firebaseUser.user.displayName?.split(" ")[1] || "",
        email,
        username,
        firebaseUid: firebaseUser.user.uid,
      });
      await userRepository.save(user);
    }

    res.status(200).json({ message: "Connexion réussie.", user });
  } catch (error: any) {
    console.error("Erreur lors de la connexion avec Google :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la connexion avec Google.", error });
  }
};
