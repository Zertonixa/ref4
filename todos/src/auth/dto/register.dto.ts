import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({example: "user@example.com"})
  @IsEmail()
  email: string;

  @ApiProperty({example: "password"})
  @IsString()
  @MinLength(6)
  password: string;
}
