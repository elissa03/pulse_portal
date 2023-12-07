import { IsInt, IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateWorkoutDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

}

export class UpdateWorkoutDto {
  @IsString()
  readonly name?: string;

  @IsString()
  readonly description?: string;
}
