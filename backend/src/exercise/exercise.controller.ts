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
import { ExerciseService } from './exercise.service';
import { Response } from 'express';

/**
 * Controller for managing exercise-related operations.
 */
@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  /**
   * Handles the request to get all exercises.
   *
   * @param {Response} res - The response object.
   * @returns The JSON response with all exercises.
   */
  @Get('exercises')
  async getAllExercises(@Res() res: Response) {
    try {
      const exercises = await this.exerciseService.getAllExercises();
      res.status(200).json(exercises);
    } catch (error) {
      res.status(500).json({ message: 'Internal Error' });
    }
  }

  /**
   * Handles the request to get a specific exercise by ID.
   *
   * @param {number} id - The ID of the exercise.
   * @param {Response} res - The response object.
   * @returns The JSON response with the exercise data.
   */
  @Get('exercises/:id')
  async getExercisesByIdController(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const exercise = await this.exerciseService.getExerciseById(id);
      res.status(200).json(exercise);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Handles the request to insert a new exercise.
   *
   * @param {any} body - The request body containing exercise data.
   * @param {Response} res - The response object.
   * @returns The JSON response indicating the result of the insertion operation.
   */
  @Post('exercises')
  async insertExerciseController(@Body() body, @Res() res: Response) {
    try {
      const exerciseData = {
        name: body.name,
        description: body.description,
        sets: body.sets,
        reps: body.reps,
        type: body.type,
        difficulty: body.difficulty,
        gif_url: body.gif_url,
      };
      const success = await this.exerciseService.insertExercise(exerciseData);
      if (success) {
        res.status(200).json({ message: 'Exercise inserted successfully' });
      } else {
        res.status(400).json({ message: 'Exercise could not be inserted' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred', error: error.message });
    }
  }

  /**
   * Handles the request to delete an exercise by ID.
   *
   * @param {number} id - The ID of the exercise to delete.
   * @param {Response} res - The response object.
   * @returns The JSON response indicating the result of the deletion operation.
   */
  @Delete('exercises/:id')
  async deleteExerciseController(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const success = await this.exerciseService.deleteExercise(id);
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
   * Handles the request to update an existing exercise.
   *
   * @param {number} id - The ID of the exercise to update.
   * @param {Response} res - The response object.
   * @param {any} body - The request body containing updated exercise data.
   * @returns The JSON response indicating the result of the update operation.
   */
  @Put('exercises/:id')
  async updateExerciseController(
    @Param('id') id: number,
    @Res() res: Response,
    @Body() body,
  ) {
    try {
      const exerciseData = {
        name: body.name,
        description: body.description,
        sets: body.sets,
        reps: body.reps,
        type: body.type,
        difficulty: body.difficulty,
      };
      const success = await this.exerciseService.updateExercise(
        id,
        exerciseData,
      );
      if (success) {
        res.status(200).json({ message: 'Exercise updated successfully' });
      } else {
        res.status(404).json({ message: 'Exercise not found' });
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
