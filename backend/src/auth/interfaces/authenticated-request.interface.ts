// src/auth/interfaces/authenticated-request.interface.ts
import { Request } from 'express';

export interface JwtPayload {
  id: number,
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  user_role: string
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
