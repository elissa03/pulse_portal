import { Controller, Body, Res, Get, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UpdateUserDto } from '../dto/user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

/**
 * Service for managing user-related operations in the database.
 */
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves all users from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'All users retrieved successfully.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getAllUsersController(@Res() res: Response): Promise<any> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal Error' });
    }
  }

  @Get('users/:id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieves a specific user by their ID from the database.',
  })
  @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the user to retrieve.',
  })
  async getUserByIdController(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Delete('users/:id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes a user from the database based on their ID.',
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the user to delete.',
  })
  async deleteUserController(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<any> {
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
  @ApiOperation({ summary: 'Update user', description: 'Updates an existing user in the database.' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiParam({ name: 'id', type: 'number', description: 'The ID of the user to update.' })
  @ApiBody({ type: UpdateUserDto, description: 'User data for the update.' })
  async updateUserController(
    @Param('id') id: number,
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    try {
      const success = await this.userService.updateUser(id, updateUserDto);
      if (success) {
        res.status(200).json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    }
  }
}
