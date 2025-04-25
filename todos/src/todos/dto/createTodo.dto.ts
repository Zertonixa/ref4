import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({title: "Title!"})
  @IsString()
  title: string;
}
