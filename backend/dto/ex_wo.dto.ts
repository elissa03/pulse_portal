import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddExerciseToWorkoutDto {
  @IsNotEmpty()
  @IsNumber()
  readonly workout_id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly exercise_id: number;
}

export class DeleteExerciseFromWorkoutDto {
  @IsNotEmpty()
  @IsNumber()
  readonly workoutId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly exerciseId: number;
}
