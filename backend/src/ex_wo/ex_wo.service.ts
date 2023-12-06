import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ExWoService {
  constructor(private databaseService: DatabaseService) {}

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

  async deleteExerciseFromWorkout(workoutId: number, exerciseId: number): Promise<any> {
    try {
      const deleteWorkoutExerciseQuery =
        'DELETE FROM workout_exercise WHERE workout_id = ? AND exercise_id = ?';
      const result = await this.databaseService.query(deleteWorkoutExerciseQuery, [
        workoutId,
        exerciseId,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }

  async insertExerciseToWorkout(workoutId: number, exerciseId: number): Promise<any> {
    try {
      const insertWorkoutExerciseQuery =
        'INSERT INTO workout_exercise (workout_id, exercise_id) VALUES (?, ?);';
      const result = await this.databaseService.query(insertWorkoutExerciseQuery, [
        workoutId,
        exerciseId,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(error);
    }
  }
}
