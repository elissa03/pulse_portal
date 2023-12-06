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

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Get('exercises')
  async getAllExercises(@Res() res: Response) {
    try {
      const exercises = await this.exerciseService.getAllExercises();
      res.status(200).json(exercises);
    } catch (error) {
      res.status(500).json({ message: 'Internal Error' });
    }
  }

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
