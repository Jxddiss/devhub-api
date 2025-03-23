import jwt, { SignOptions } from "jsonwebtoken";
import { TokenPayload } from "../types/tokenPayload";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 3000;

/**
 * Génère un token JWT avec les informations utilisateur.
 * @param payload Les données à inclure dans le token.
 * @returns Le token signé.
 */
export const generateToken = (payload: TokenPayload): string => {
    const options: SignOptions = { expiresIn: typeof JWT_EXPIRES_IN === "string" ? parseInt(JWT_EXPIRES_IN, 10) : JWT_EXPIRES_IN };
    return jwt.sign(payload, JWT_SECRET, options);
  };

/**
 * Vérifie et décode un token JWT.
 * @param token Le token à vérifier.
 * @returns Les données décodées du token.
 * @throws Une erreur si le token est invalide ou expiré.
 */
export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
};