import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload, AuthenticatedRequest } from '../interfaces/authenticated-request.interface';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
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
