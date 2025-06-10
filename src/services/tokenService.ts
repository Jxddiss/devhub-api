import jwt, { SignOptions } from 'jsonwebtoken';
import { TokenPayload } from '../types/tokenPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 3000;

export const generateToken = (payload: TokenPayload): string => {
  const options: SignOptions = { expiresIn: typeof JWT_EXPIRES_IN === 'string' ? parseInt(JWT_EXPIRES_IN, 10) : JWT_EXPIRES_IN };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired token.');
  }
};
