import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload, AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  /**
   * Middleware to authenticate JWT tokens on incoming requests.
   *
   * @param {AuthenticatedRequest} req - The request object, enhanced to include the user property.
   * @param {NextFunction} next - The next middleware function in the stack.
   * @throws {UnauthorizedException} If the token is not present or invalid.
   */
  use(req: AuthenticatedRequest, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) throw new UnauthorizedException();

    jwt.verify(token, process.env.JWT_SECRET, (err, user: JwtPayload) => {
      if (err) {
        console.log(err);
        throw new UnauthorizedException();
      }
      req.user = user;
      next();
    });
  }
}
