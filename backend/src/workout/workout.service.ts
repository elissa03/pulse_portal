import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class WorkoutService {
  constructor(private databaseService: DatabaseService) {}

  async getWorkoutsByUser(user_id: number): Promise<any> {
    try {
      const sql = `SELECT * FROM workouts WHERE user_id = ?;`;
      const workouts = await this.databaseService.query(sql, [user_id]);
      return workouts;
    } catch (error) {
      throw new Error(error);
    }
  }

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

  async insertWorkout(workoutData: any): Promise<any>{
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

  async updateWorkout(id: number, workoutData: any): Promise<any>{
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
