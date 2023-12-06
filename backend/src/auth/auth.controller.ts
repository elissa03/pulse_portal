import {
  Controller,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    try {
      const result = await this.authService.login(body.email, body.password);
      if (result.status === 200) {
        const token = jwt.sign(
          { id: result.user[0].id },
          process.env.JWT_SECRET
        );
        return res
          .status(200)
          .json({ message: result.message, token: token, user: result.user });
      } else {
        return res.status(result.status).json({ message: result.message });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Post('register')
  async register(@Body() body, @Res() res: Response) {
    try {
      const result = await this.authService.register(body);
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
