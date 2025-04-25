import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty({example: "Title!"})
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({example: false})
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
