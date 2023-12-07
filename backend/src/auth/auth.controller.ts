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

  /**
   * Handles the login request and generates a JWT token upon successful authentication.
   *
   * @param body - The request body with `email` and `password`.
   * @param res - The Express response object.
   * @returns Responds with a status of 200 and a JWT token if successful,
   *           otherwise responds with the appropriate status and error message.
   */
  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    try {
      const result = await this.authService.login(body.email, body.password);
      if (result.status === 200) {
        const token = jwt.sign(
          { id: result.user[0].id },
          process.env.JWT_SECRET,
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

  /**
   * Handles user registration requests.
   *
   * @param body - The request body containing new user information,
   *               including `first_name`, `last_name`, `email`, `password`, and `confirm_password`.
   * @param res - The Express response object.
   * @returns Responds with a status of 201 if the user is successfully registered,
   *           otherwise responds with the appropriate status and error message.
   */
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
