import {
  Controller,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ApiTags, ApiOperation, ApiResponse, ApiBody} from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Log in a user',
    description: 'Validates user credentials and returns a JWT token',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful, JWT token returned',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid credentials',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({
    description: 'Login Credentials',
    type: 'object',
    required: true,
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email', description: 'User email' },
        password: {
          type: 'string',
          format: 'password',
          description: 'User password',
        },
      },
      required: ['email', 'password'],
    },
  })
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

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Registers a new user and returns a success message',
  })
  @ApiResponse({
    status: 201,
    description: 'Registration successful, user created',
  })
  @ApiResponse({ status: 400, description: 'Bad request, invalid user data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data to register',
  })
  async register(@Body() body, @Res() res: Response) {
    try {
      const result = await this.authService.register(body);
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
