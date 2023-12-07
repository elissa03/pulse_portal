import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

/**
 * Service that provides operations to manage the association between exercises and workouts.
 */
@Injectable()
export class ExWoService {
  constructor(private databaseService: DatabaseService) {}

  /**
   * Retrieves all exercises associated with a given workout ID.
   *
   * @param {number} workoutId - The ID of the workout to retrieve exercises for.
   * @returns {Promise<any>} A promise that resolves to an array of exercises.
   * @throws Will throw an error if the query fails.
   */
  async getExercisesByWorkoutId(workoutId: number): Promise<any> {
    try {
      const sql = `
      SELECT e.*
      FROM exercises e
      INNER JOIN workout_exercise we ON e.id = we.exercise_id
      WHERE we.workout_id = ?;`;
      const exercises = await this.databaseService.query(sql, [workoutId]);
      return exercises;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  /**
   * Deletes an association of an exercise from a workout.
   *
   * @param {number} workoutId - The ID of the workout to delete the exercise from.
   * @param {number} exerciseId - The ID of the exercise to be deleted from the workout.
   * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful, false otherwise.
   * @throws Will throw an error if the query fails.
   */
  async deleteExerciseFromWorkout(
    workoutId: number,
    exerciseId: number,
  ): Promise<any> {
    try {
      const deleteWorkoutExerciseQuery =
        'DELETE FROM workout_exercise WHERE workout_id = ? AND exercise_id = ?';
      const result = await this.databaseService.query(
        deleteWorkoutExerciseQuery,
        [workoutId, exerciseId],
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Inserts an association of an exercise into a workout.
   *
   * @param {number} workoutId - The ID of the workout to add the exercise to.
   * @param {number} exerciseId - The ID of the exercise to be added to the workout.
   * @returns {Promise<boolean>} A promise that resolves to true if the insertion was successful, false otherwise.
   * @throws Will throw an error if the query fails.
   */
  async insertExerciseToWorkout(
    workoutId: number,
    exerciseId: number,
  ): Promise<any> {
    try {
      const insertWorkoutExerciseQuery =
        'INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (?, ?);';
      const result = await this.databaseService.query(
        insertWorkoutExerciseQuery,
        [workoutId, exerciseId],
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }
}
