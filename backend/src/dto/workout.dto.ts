import { IsInt, IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the workout',
    example: 'Morning Run',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'A brief description of the workout',
    example: 'A 5km run around the neighborhood',
  })
  readonly description: string;
}

export class UpdateWorkoutDto {
  @IsString()
  @ApiProperty({
    description: 'The updated name of the workout',
    example: 'Evening Yoga',
  })
  readonly name?: string;

  @IsString()
  @ApiProperty({
    description: 'The updated description of the workout',
    example: 'A relaxing yoga session to wind down the day',
  })
  readonly description?: string;
}
