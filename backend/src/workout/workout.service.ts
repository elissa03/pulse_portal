import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

/**
 * Service for managing workout data.
 */
@Injectable()
export class WorkoutService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * Retrieves all workouts for a given user.
   *
   * @param {number} user_id - The ID of the user to retrieve workouts for.
   * @returns {Promise<any>} A promise that resolves to an array of workout objects.
   * @throws Will throw an error if the database query fails.
   */
  async getWorkoutsByUser(user_id: number): Promise<any> {
    try {
      const sql = `SELECT * FROM workouts WHERE user_id = ?;`;
      const workouts = await this.databaseService.query(sql, [user_id]);
      return workouts;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Retrieves a specific workout by its ID.
   *
   * @param {number} id - The ID of the workout to retrieve.
   * @returns {Promise<any>} A promise that resolves to the workout object.
   * @throws Will throw an error if the workout is not found or the query fails.
   */
  async getWorkoutById(id: number): Promise<any> {
    try {
      const sql = `SELECT * FROM workouts WHERE id = ?;`;
      const results = await this.databaseService.query(sql, [id]);
      if (results.length === 0) {
        throw new Error('Workout not found');
      }
      return results[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Inserts a new workout into the database.
   *
   * @param {any} workoutData - The data for the new workout.
   * @returns {Promise<any>} A promise that resolves to a boolean indicating the success of the insertion.
   * @throws Will throw an error if required fields are missing or the insertion fails.
   */
  async insertWorkout(workoutData: any): Promise<any> {
    try {
      const { name, created_date, description, user_id } = workoutData;
      if (!name || !description || !created_date || !user_id) {
        throw new Error('All fields are required to insert a new workout');
      }
      const sql = `INSERT INTO workouts (name, created_date, description, user_id)  VALUES (?, ?, ?, ?);`;
      const result = await this.databaseService.query(sql, [
        name,
        created_date,
        description,
        user_id,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Updates an existing workout in the database.
   *
   * @param {number} id - The ID of the workout to update.
   * @param {any} workoutData - The updated data for the workout.
   * @returns {Promise<any>} A promise that resolves to a boolean indicating the success of the update.
   * @throws Will throw an error if no valid fields are provided or the update fails.
   */
  async updateWorkout(id: number, workoutData: any): Promise<any> {
    try {
      const { name, description } = workoutData;
      const fieldsToUpdate = [];
      const values = [];
      if (name) {
        fieldsToUpdate.push('name = ?');
        values.push(name);
      }
      if (description) {
        fieldsToUpdate.push('description = ?');
        values.push(description);
      }
      if (fieldsToUpdate.length === 0) {
        throw new Error('No valid fields provided to update');
      }
      const sql = `UPDATE workouts SET ${fieldsToUpdate.join(
        ', ',
      )} WHERE id = ?;`;
      values.push(id);
      const result = await this.databaseService.query(sql, values);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Deletes a workout from the database based on its ID.
   *
   * @param {number} id - The ID of the workout to delete.
   * @returns {Promise<any>} A promise that resolves to a boolean indicating the success of the deletion.
   * @throws Will throw an error if the deletion fails.
   */
  async deleteWorkout(id: number): Promise<any> {
    try {
      const sql = `DELETE FROM workouts WHERE id = ?;`;
      const result = await this.databaseService.query(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }
}
