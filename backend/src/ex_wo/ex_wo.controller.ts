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
} from 'src/dto/ex_wo.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

/**
 * Controller for managing the association between exercises and workouts.
 */
@ApiTags('Workout-Exercises')
@Controller('ex-wo')
export class ExWoController {
  constructor(private exwoService: ExWoService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get all exercises in a workout',
    description: 'Retrieves exercises associated with a specific workout ID',
  })
  @ApiResponse({
    status: 200,
    description: 'All exercises retrieved successfully.',
  })
  @ApiResponse({ status: 500, description: 'Internal Error' })
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
  @ApiOperation({
    summary: 'Delete exercise from workout',
    description: 'Deletes an exercise from a specific workout.',
  })
  @ApiResponse({ status: 200, description: 'Exercise deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({
    name: 'workoutId',
    type: 'number',
    description: 'ID of the workout',
  })
  @ApiParam({
    name: 'exerciseId',
    type: 'number',
    description: 'ID of the exercise to delete',
  })
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

  @Post('/workouts/exercises')
  @ApiOperation({
    summary: 'Add exercise to workout',
    description: ' Adds an exercise to a specific workout.',
  })
  @ApiResponse({ status: 201, description: 'Exercise inserted successfully.' })
  @ApiResponse({ status: 400, description: 'Exercise could not be inserted' })
  @ApiResponse({ status: 500, description: 'An error occurred' })
  @ApiBody({
    type: AddExerciseToWorkoutDto,
    description: 'Exercise to add to a workout.',
  })
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
