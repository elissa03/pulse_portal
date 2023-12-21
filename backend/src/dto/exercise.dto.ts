import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the exercise',
    example: 'Push-up',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'A description of the exercise',
    example: 'A classic upper body exercise.',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The number of sets for the exercise',
    example: 3,
  })
  sets: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The number of repetitions for each set',
    example: 15,
  })
  reps: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The type of exercise',
    example: 'Strength',
  })
  type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The difficulty level of the exercise',
    example: 'Intermediate',
  })
  difficulty: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'URL to a GIF demonstrating the exercise (optional)',
    example: 'exercise.gif',
  })
  gif_url?: string;
}

export class UpdateExerciseDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The updated name of the exercise',
    example: 'Modified Push-up',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The updated description of the exercise',
    example: 'A variation of the classic upper body exercise.',
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The updated number of sets for the exercise',
    example: 4,
  })
  sets?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The updated number of repetitions for each set',
    example: 12,
  })
  reps?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The updated type of exercise',
    example: 'Strength',
  })
  type?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The updated difficulty level of the exercise',
    example: 'Advanced',
  })
  difficulty?: string;
}