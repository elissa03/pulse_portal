import { Controller, Body, Res, Get, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  async getAllUsersController(@Res() res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal Error' });
    }
  }

  @Get('users/:id')
  async getUserByIdController(@Param('id') id: number, @Res() res: Response) {
    try {
      const user = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Delete('users/:id')
  async deleteUserController(@Param('id') id: number, @Res() res: Response) {
    try {
      const success = await this.userService.deleteUser(id);
      if (success) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Put('users/:id')
  async updateUserController(
    @Param('id') id: number,
    @Res() res: Response,
    @Body() body,
  ) {
    try {
      const userId = id;
      const userData = {
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name,
        password: body.password,
        user_role: body.user_role,
      };
      const success = await this.userService.updateUser(userId, userData);
      if (success) {
        res.status(200).json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error.message);
      if (error.message === 'No valid fields provided to update') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
