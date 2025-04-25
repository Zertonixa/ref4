import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';

@ApiTags('Todos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@CurrentUser() user: { userId: number }, @Body() dto: CreateTodoDto) {
    return this.todosService.create(user.userId, dto);
  }

  @Get()
  findAll(@CurrentUser() user: { userId: number }) {
    return this.todosService.findAll(user.userId);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: { userId: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.findOne(user.userId, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { userId: number },
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoDto,
  ) {
    return this.todosService.update(user.userId, id, dto);
  }

  @Delete(':id')
  remove(
    @CurrentUser() user: { userId: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.remove(user.userId, id);
  }
}
