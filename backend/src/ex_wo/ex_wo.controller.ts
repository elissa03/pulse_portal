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

@Controller('ex-wo')
export class ExWoController {
  constructor(private exwoService: ExWoService) {}

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

  @Delete(':workoutId/:exerciseId')
  async deleteExerciseFromWorkoutController(
    @Res() res: Response,
    @Param('workoutId') workoutId: number,
    @Param('exerciseId') exerciseId: number,
  ) {
    try {
      const success = await this.exwoService.deleteExerciseFromWorkout(
        workoutId,
        exerciseId,
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

  @Post('/workouts/exercises')
  async insertExerciseToWorkoutController(@Body() body, @Res() res: Response) {
    try {
      const workoutId = body.workout_id;
      const exerciseId = body.exercise_id;

      const success = await this.exwoService.insertExerciseToWorkout(workoutId, exerciseId);

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