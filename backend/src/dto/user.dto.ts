import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email address of the new user',
    example: 'user@example.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The first name of the new user',
    example: 'John',
  })
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The last name of the new user',
    example: 'Doe',
  })
  readonly last_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The password of the new user',
    example: 'password123',
  })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The user role of the new user',
    example: 'user',
  })
  readonly user_role: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'The updated email address of the user',
    example: 'newemail@example.com',
  })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The updated first name of the user',
    example: 'John',
  })
  readonly first_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The updated last name of the user',
    example: 'Doe',
  })
  readonly last_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The updated password of the user',
    example: 'newpassword123',
  })
  readonly password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The updated user role of the user',
    example: 'admin',
  })
  readonly user_role?: string;
}
