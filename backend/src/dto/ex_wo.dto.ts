import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddExerciseToWorkoutDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The ID of the workout to which the exercise will be added',
    example: 4,
  })
  readonly workout_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The ID of the exercise to be added to the workout',
    example: 10,
  })
  readonly exercise_id: number;
}

export class DeleteExerciseFromWorkoutDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description:
      'The ID of the workout from which the exercise will be deleted',
    example: 4,
  })
  readonly workoutId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The ID of the exercise to be deleted from the workout',
    example: 10,
  })
  readonly exerciseId: number;
}
