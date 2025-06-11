import crypto from 'crypto';
import jwt, { SignOptions } from 'jsonwebtoken';
import { TokenPair, TokenPayload } from '../types/tokenPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'default_refresh_secret_key';
const JWT_ACCESS_TOKEN_EXPIRES_IN = (process.env.JWT_ACCESS_TOKEN_EXPIRES_IN ||
  '15m') as string;
const REFRESH_TOKEN_EXPIRES_IN = (process.env.JWT_REFRESH_TOKEN_EXPIRES_IN ||
  '7d') as string;

function parseTimeString(timeStr: string): number {
  const match = timeStr.match(/^(\d+)(ms|s|m|h|d)$/);
  if (!match) return 0;

  const [, value, unit] = match;
  const num = parseInt(value, 10);

  switch (unit) {
    case 'ms':
      return num;
    case 's':
      return num * 1000;
    case 'm':
      return num * 60 * 1000;
    case 'h':
      return num * 60 * 60 * 1000;
    case 'd':
      return num * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN as SignOptions['expiresIn'],
  });
}

export function generateTokenPair(payload: TokenPayload): TokenPair {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN as SignOptions['expiresIn'],
  });

  const refreshTokenPayload = {
    id: payload.id,
    type: 'refresh' as const,
    jti: crypto.randomUUID(),
  };

  const refreshToken = jwt.sign(refreshTokenPayload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN as SignOptions['expiresIn'],
  });

  const expiresAt =
    Date.now() +
    (typeof REFRESH_TOKEN_EXPIRES_IN === 'number'
      ? REFRESH_TOKEN_EXPIRES_IN * 1000
      : parseTimeString(REFRESH_TOKEN_EXPIRES_IN));

  return {
    accessToken,
    refreshToken,
    expiresAt,
  };
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): {
  id: number;
  type: string;
  jti: string;
} {
  return jwt.verify(token, JWT_REFRESH_SECRET) as {
    id: number;
    type: string;
    jti: string;
  };
}
