import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcryptjs';

/**
 * Service for managing user data.
 */
@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * Retrieves all users from the database.
   *
   * @returns {Promise<any>} A promise that resolves to an array of user objects.
   * @throws Will throw an error if the database query fails.
   */
  async getAllUsers(): Promise<any> {
    try {
      const sql = `SELECT * FROM users;`;
      const users = await this.databaseService.query(sql);
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Retrieves a specific user by their ID.
   *
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<any>} A promise that resolves to the user object.
   * @throws Will throw an error if the user is not found or the query fails.
   */
  async getUserById(id: number): Promise<any> {
    try {
      const sql = `SELECT * FROM users WHERE id = ?;`;
      const results = await this.databaseService.query(sql, [id]);
      if (results.length === 0) {
        throw new Error('User not found');
      }
      return results[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Deletes a user from the database based on their ID.
   *
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<any>} A promise that resolves to a boolean indicating the success of the deletion.
   * @throws Will throw an error if the deletion fails.
   */
  async deleteUser(id: number): Promise<any> {
    try {
      const sql = `DELETE FROM users WHERE id = ?;`;
      const result = await this.databaseService.query(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Deletes a user from the database based on their ID.
   *
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<any>} A promise that resolves to a boolean indicating the success of the deletion.
   * @throws Will throw an error if the deletion fails.
   */
  async updateUser(id: number, userData: any): Promise<any> {
    try {
      const { email, password, first_name, last_name, user_role } = userData;
      const fieldsToUpdate = [];
      const values = [];
      if (email) {
        fieldsToUpdate.push('email = ?');
        values.push(email);
      }
      if (first_name) {
        fieldsToUpdate.push('first_name = ?');
        values.push(first_name);
      }
      if (last_name) {
        fieldsToUpdate.push('last_name = ?');
        values.push(last_name);
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 8);
        fieldsToUpdate.push('password = ?');
        values.push(hashedPassword);
      }
      if (user_role) {
        fieldsToUpdate.push('user_role = ?');
        values.push(user_role);
      }
      if (fieldsToUpdate.length === 0) {
        throw new Error('No valid fields provided to update');
      }
      const sql = `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = ?;`;
      values.push(id);
      const result = await this.databaseService.query(sql, values);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }
}
