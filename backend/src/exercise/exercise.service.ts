import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

/**
 * Service for managing exercise data.
 */
@Injectable()
export class ExerciseService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * Retrieves all exercises from the database.
   *
   * @returns {Promise<any>} A promise that resolves to an array of exercise objects.
   * @throws Will throw an error if the database query fails.
   */
  async getAllExercises(): Promise<any> {
    try {
      const sql = `SELECT * FROM exercises;`;
      const exercises = await this.databaseService.query(sql);
      return exercises;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Retrieves a specific exercise by its ID.
   *
   * @param {number} id - The ID of the exercise to retrieve.
   * @returns {Promise<any>} A promise that resolves to the exercise object.
   * @throws Will throw an error if the exercise is not found or the query fails.
   */
  async getExerciseById(id: number): Promise<any> {
    try {
      const sql = `SELECT * FROM exercises WHERE id = ?;`;
      const results = await this.databaseService.query(sql, [id]);
      if (results.length === 0) {
        throw new Error('Exercise not found');
      }
      return results[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Inserts a new exercise into the database.
   *
   * @param {any} exerciseData - The data for the new exercise.
   * @returns {Promise<any>} A promise that resolves to the result of the insertion operation.
   * @throws Will throw an error if required fields are missing or the insertion fails.
   */
  async insertExercise(exerciseData: any): Promise<any> {
    try {
      const { name, description, sets, reps, type, difficulty, gif_url } =
        exerciseData;
      if (!name || !description || !sets || !reps) {
        throw new Error('All fields are required to insert a new exercise');
      }
      const sql = `INSERT INTO exercises (name, description, sets, reps, type, difficulty, gif_url) VALUES (?, ?, ?, ?, ?, ?, ?);`;
      const result = await this.databaseService.query(sql, [
        name,
        description,
        sets,
        reps,
        type,
        difficulty,
        gif_url,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Deletes an exercise from the database based on its ID.
   *
   * @param {number} id - The ID of the exercise to delete.
   * @returns {Promise<any>} A promise that resolves to a boolean indicating the success of the deletion.
   * @throws Will throw an error if the deletion fails.
   */
  async deleteExercise(id: number): Promise<any> {
    try {
      const sql = `DELETE FROM exercises WHERE id = ?;`;
      const result = await this.databaseService.query(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Updates an existing exercise in the database.
   *
   * @param {number} id - The ID of the exercise to update.
   * @param {any} exerciseData - The updated data for the exercise.
   * @returns {Promise<any>} A promise that resolves to a boolean indicating the success of the update.
   * @throws Will throw an error if no valid fields are provided or the update fails.
   */
  async updateExercise(id: number, exerciseData: any): Promise<any> {
    try {
      const { name, description, sets, reps, type, difficulty } = exerciseData;
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
      if (sets) {
        fieldsToUpdate.push('sets = ?');
        values.push(sets);
      }
      if (reps) {
        fieldsToUpdate.push('reps = ?');
        values.push(reps);
      }
      if (type) {
        fieldsToUpdate.push('type = ?');
        values.push(type);
      }
      if (difficulty) {
        fieldsToUpdate.push('difficulty = ?');
        values.push(difficulty);
      }
      if (fieldsToUpdate.length === 0) {
        throw new Error('No valid fields provided to update');
      }
      const sql = `UPDATE exercises SET ${fieldsToUpdate.join(
        ', ',
      )} WHERE id = ?;`;
      values.push(id);
      const result = await this.databaseService.query(sql, values);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }
}
