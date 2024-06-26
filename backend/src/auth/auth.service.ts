import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * Authenticates a user by their email and password.
   *
   * @param {string} email - The email address of the user attempting to log in.
   * @param {string} password - The plaintext password provided by the user.
   * @returns {Promise<{status: number, message: string, user?: any}>} An object containing the status code,
   *          message, and user information if authentication is successful. If authentication fails,
   *          the user field is omitted.
   */
  async login(email: string, password: string): Promise<any> {
    try {
      if (!email || !password) {
        return { status: 400, message: 'Please provide an email and password' };
      }

      const sql = 'SELECT * FROM users WHERE email = ?';
      const user = await this.databaseService.query(sql, [email]);

      if (!user[0] || !(await bcrypt.compare(password, user[0].password))) {
        return { status: 401, message: 'Email or Password is incorrect' };
      }
      return {
        status: 200,
        message: 'Successful',
        user,
      };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Internal error' };
    }
  }

  /**
   * Registers a new user with the provided information.
   *
   * @param {any} data - An object containing the user's registration information.
   *                     Expected to have first_name, last_name, email, password, and confirm_password fields.
   * @returns {Promise<{status: number, message: string}>} An object containing the status code and message
   *          indicating the result of the registration attempt.
   */
  async register(data: any): Promise<any> {
    try {
      const { first_name, last_name, email, password, confirm_password } = data;

      if (
        !email ||
        !password ||
        !first_name ||
        !last_name ||
        !confirm_password
      ) {
        return { status: 400, message: 'Please fill out all the fields' };
      }

      const sql = 'SELECT * FROM users WHERE email = ?';
      const existingUser = await this.databaseService.query(sql, [email]);

      if (existingUser.length > 0) {
        return { status: 409, message: 'The email is already in use' };
      } else if (password !== confirm_password) {
        return { status: 400, message: "Passwords don't match" };
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const insertUserQuery =
        'INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)';
      await this.databaseService.query(insertUserQuery, [
        email,
        hashedPassword,
        first_name,
        last_name,
      ]);
      return { status: 201, message: 'User registered' };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Internal error' };
    }
  }
}
