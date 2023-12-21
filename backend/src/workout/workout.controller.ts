import {
  Controller,
  Body,
  Res,
  Get,
  Param,
  Delete,
  Put,
  Post,
  Req,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { CreateWorkoutDto, UpdateWorkoutDto } from 'src/dto/workout.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

/**
 * Controller for managing workout-related operations.
 */
@ApiTags('Workouts')
@Controller('workout')
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}

  @Post('workouts')
  @ApiOperation({
    summary: 'Create a workout',
    description: 'Inserts a new workout for the authenticated user',
  })
  @ApiResponse({ status: 200, description: 'Workout inserted successfully' })
  @ApiResponse({ status: 400, description: 'Workout could not be inserted' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({
    description: 'Workout Creation Data',
    required: true,
    type: CreateWorkoutDto,
  })
  async insertWorkoutController(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
    @Body() createWorkoutDto: CreateWorkoutDto,
  ) {
    try {
      const currentDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');

      const workoutData = {
        ...createWorkoutDto,
        created_date: currentDate,
        user_id: req.user.id,
      };
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
  @ApiOperation({
    summary: 'Delete a workout',
    description: 'Deletes a workout from the database based on its ID',
  })
  @ApiResponse({ status: 200, description: 'Exercise deleted successfully' })
  @ApiResponse({ status: 404, description: 'Exercise not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the workout to delete',
  })
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
  @ApiOperation({
    summary: 'Get workouts',
    description: 'Retrieves all workouts for the authenticated user',
  })
  @ApiResponse({ status: 200, description: 'Workouts retrieved successfully' })
  @ApiResponse({ status: 500, description: 'Internal Error' })
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
  @ApiOperation({
    summary: 'Get a workout',
    description: 'Retrieves a specific workout by its ID',
  })
  @ApiResponse({ status: 200, description: 'Workout retrieved successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of workout to retrieve',
  })
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
  @ApiOperation({
    summary: 'Update a workout',
    description: 'Updates an existing workout in the database',
  })
  @ApiResponse({ status: 200, description: 'Workout updated successfully' })
  @ApiResponse({ status: 404, description: 'Workout not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({
    description: 'Workout Update Data',
    required: true,
    type: UpdateWorkoutDto, // Use the DTO class
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of workout to update',
  })
  async updateWorkoutController(
    @Param('id') id: number,
    @Res() res: Response,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    try {
      const success = await this.workoutService.updateWorkout(
        id,
        updateWorkoutDto,
      );
      if (success) {
        res.status(200).json({ message: 'Workout updated successfully' });
      } else {
        res.status(404).json({ message: 'Workout not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
