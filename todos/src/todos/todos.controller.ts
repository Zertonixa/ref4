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

@ApiTags('Todos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  createTodo(
    @CurrentUser() user: { userId: number },
    @Body() body: { title: string },
  ) {
    return this.todosService.create(user.userId, body);
  }

  @Get()
  findAllTodos(@CurrentUser() user: { userId: number }) {
    return this.todosService.findAll(user.userId);
  }

  @Get(':id')
  findOneTodo(
    @CurrentUser() user: { userId: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.findOne(user.userId, id);
  }

  @Patch(':id')
  updateTodo(
    @CurrentUser() user: { userId: number },
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { title: string },
  ) {
    return this.todosService.update(user.userId, id, body);
  }

  @Delete(':id')
  removeTodo(
    @CurrentUser() user: { userId: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.todosService.remove(user.userId, id);
  }
}
