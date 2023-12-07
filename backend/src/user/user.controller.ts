import { Controller, Body, Res, Get, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

/**
 * Service for managing user-related operations in the database.
 */
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Retrieves all users from the database.
   *
   * @returns {Promise<any>} A promise that resolves to an array of user objects.
   * @throws Will throw an error if the database query fails.
   */
  @Get('users')
  async getAllUsersController(@Res() res: Response): Promise<any> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal Error' });
    }
  }

  /**
   * Retrieves a specific user by their ID.
   *
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<any>} A promise that resolves to the user object.
   * @throws Will throw an error if the user is not found or the query fails.
   */
  @Get('users/:id')
  async getUserByIdController(@Param('id') id: number, @Res() res: Response): Promise<any> {
    try {
      const user = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Deletes a user from the database based on their ID.
   *
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<any>} A promise that resolves to a boolean indicating the success of the deletion.
   * @throws Will throw an error if the deletion fails.
   */
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

  /**
   * Updates an existing user in the database.
   *
   * @param {number} id - The ID of the user to update.
   * @param {any} body - The body of the request containing user data for the update.
   * @param {Response} res - The response object.
   * @returns {Promise<any>} A promise that resolves to a boolean indicating the success of the update.
   * @throws Will throw an error if no valid fields are provided or the update fails.
   */
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
