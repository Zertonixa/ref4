import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({example: "user@example.com"})
  @IsEmail()
  email: string;

  @ApiProperty({example: "password"})
  @IsString()
  password: string;
}
