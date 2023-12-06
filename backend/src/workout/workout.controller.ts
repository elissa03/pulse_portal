import { Controller, Body, Res, Get, Param, Delete, Put, Post, Req } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';

@Controller('workout')
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}

  @Post('workouts')
  async insertWorkoutController(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Body() body,
  ) {
    try {
      const currentDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      const workoutData = {
        name: body.name,
        created_date: currentDate,
        description: body.description,
        user_id: req.user.id,
      };
      console.log(req.user);
      const success = await this.workoutService.insertWorkout(workoutData);
      if (success) {
        res.status(200).json({ message: 'Workout inserted successfully' });
      } else {
        res.status(400).json({ message: 'Workout could not be inserted' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred', error: error.message });
    }
  }

  @Delete('workouts/:id')
  async deleteWorkoutController(@Param('id') id: number, @Res() res: Response) {
    try {
      const success = await this.workoutService.deleteWorkout(id);
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

  @Get('workouts')
  async getWorkoutsByUserController(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    try {
      const workouts = await this.workoutService.getWorkoutsByUser(req.user.id);
      res.status(200).json(workouts);
    } catch (error) {
      res.status(500).json({ message: 'Internal Error' });
    }
  }

  @Get('workouts/:id')
  async getWorkoutByIdController(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const workout = await this.workoutService.getWorkoutById(id);
      res.status(200).json(workout);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Put('workouts/:id')
  async updateWorkoutController(
    @Param('id') id: number,
    @Res() res: Response,
    @Body() body,
  ) {
    try {
      const workout_id = id;
      const workoutData = {
        name: body.name,
        description: body.description,
      };
      const success = await this.workoutService.updateWorkout(
        workout_id,
        workoutData,
      );
      if (success) {
        res.status(200).json({ message: 'Workout updated successfully' });
      } else {
        res.status(404).json({ message: 'Workout not found' });
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

