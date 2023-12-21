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
import { CreateExerciseDto, UpdateExerciseDto } from 'src/dto/exercise.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

/**
 * Controller for managing exercise-related operations.
 */
@ApiTags('Exercises')
@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Get('exercises')
  @ApiOperation({
    summary: 'Get all exercises',
    description: 'Retrieves all exercises from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'All exercises retrieved successfully.',
  })
  @ApiResponse({ status: 500, description: 'Internal Error' })
  async getAllExercises(@Res() res: Response) {
    try {
      const exercises = await this.exerciseService.getAllExercises();
      res.status(200).json(exercises);
    } catch (error) {
      res.status(500).json({ message: 'Internal Error' });
    }
  }

  @Get('exercises/:id')
  @ApiOperation({
    summary: 'Get exercise by ID',
    description: 'Retrieves a specific exercise by their ID.',
  })
  @ApiResponse({ status: 200, description: 'Exercise retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the exercise to retrieve',
  })
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

  @Post('exercises')
  @ApiOperation({
    summary: 'Create exercise',
    description: 'Inserts a new exercise into the database.',
  })
  @ApiResponse({ status: 200, description: 'Exercise inserted successfully.' })
  @ApiResponse({ status: 400, description: 'Exercise could not be inserted' })
  @ApiResponse({ status: 500, description: 'An error occurred' })
  @ApiBody({
    type: CreateExerciseDto,
    description: 'Exercise data for insertion.',
  })
  async insertExerciseController(
    @Body() createExerciseDto: CreateExerciseDto,
    @Res() res: Response,
  ) {
    try {
      const success =
        await this.exerciseService.insertExercise(createExerciseDto);
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

  @Delete('exercises/:id')
  @ApiOperation({
    summary: 'Delete exercise',
    description: 'Deletes an exercise by ID from the database.',
  })
  @ApiResponse({ status: 200, description: 'Exercise deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the exercise to delete',
  })
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

  @Put('exercises/:id')
  @ApiOperation({
    summary: 'Update exercise',
    description: 'Updates an existing exercise in the database.',
  })
  @ApiResponse({ status: 200, description: 'Exercise updated successfully.' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  @ApiResponse({
    status: 400,
    description: 'No valid fields provided to update',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the exercise to update',
  })
  @ApiBody({
    type: UpdateExerciseDto,
    description: 'Exercise data for the update.',
  })
  async updateExerciseController(
    @Param('id') id: number,
    @Res() res: Response,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    try {
      const success = await this.exerciseService.updateExercise(
        id,
        updateExerciseDto,
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
