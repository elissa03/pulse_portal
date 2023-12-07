import {
  Controller,
  Body,
  Res,
  Get,
  Param,
  Delete,
  Put,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { ExWoService } from './ex_wo.service';
import {
  AddExerciseToWorkoutDto,
  DeleteExerciseFromWorkoutDto,
} from 'dto/ex_wo.dto';

/**
 * Controller for managing the association between exercises and workouts.
 */
@Controller('ex-wo')
export class ExWoController {
  constructor(private exwoService: ExWoService) {}

  /**
   * Retrieves exercises associated with a specific workout ID.
   *
   * @param res - The Express response object.
   * @param id - The ID of the workout.
   * @returns A JSON response containing the exercises.
   */
  @Get(':id')
  async getExercisesByWorkoutIdController(
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    try {
      const workoutId = id;
      const exercises =
        await this.exwoService.getExercisesByWorkoutId(workoutId);
      res.status(200).json(exercises);
    } catch (error) {
      res.status(500).json({ message: 'Internal Error' });
    }
  }

  /**
   * Deletes an exercise from a specific workout.
   *
   * @param res - The Express response object.
   * @param workoutId - The ID of the workout.
   * @param exerciseId - The ID of the exercise to be deleted.
   * @returns A JSON response indicating success or failure of the operation.
   */
  @Delete(':workoutId/:exerciseId')
  async deleteExerciseFromWorkoutController(
    @Res() res: Response,
    @Param() deleteExerciseFromWorkoutDto: DeleteExerciseFromWorkoutDto,
  ) {
    try {
      const success = await this.exwoService.deleteExerciseFromWorkout(
        deleteExerciseFromWorkoutDto.workoutId,
        deleteExerciseFromWorkoutDto.exerciseId,
      );
      if (success) {
        res.status(200).json({ message: 'Exercise deleted successfully' });
      } else {
        res.status(404).json({ message: 'Exercise not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Adds an exercise to a specific workout.
   *
   * @param body - The request body containing `workout_id` and `exercise_id`.
   * @param res - The Express response object.
   * @returns A JSON response indicating success or failure of the operation.
   */
  @Post('/workouts/exercises')
  async insertExerciseToWorkoutController(
    @Body() addExerciseToWorkoutDto: AddExerciseToWorkoutDto,
    @Res() res: Response,
  ) {
    try {
      const success = await this.exwoService.insertExerciseToWorkout(
        addExerciseToWorkoutDto.workout_id,
        addExerciseToWorkoutDto.exercise_id,
      );

      if (success) {
        res
          .status(201)
          .json({ message: 'Exercise added successfully to workout' });
      } else {
        res.status(400).json({ message: 'Could not add exercise to workout' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred', error: error.message });
    }
  }
}
