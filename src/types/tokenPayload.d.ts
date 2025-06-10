export interface TokenPayload {
  id: number;
  email: string;
  username: string;
  lastName: string;
  firstName: string;
  avatar?: string | null;
  exp?: number;
  iat?: number;
}
