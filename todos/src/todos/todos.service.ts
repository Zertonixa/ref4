import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, body: { title: string }) {
    return this.prisma.todo.create({
      data: {
        title: body.title,
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  findOne(userId: number, id: number) {
    return this.prisma.todo.findFirst({
      where: { id, userId },
    });
  }

  async update(userId: number, id: number, body: { title: string }) {
    const todo = await this.findOne(userId, id);
    if (!todo) throw new NotFoundException('Todo not found');

    return this.prisma.todo.update({
      where: { id },
      data: body,
    });
  }

  async remove(userId: number, id: number) {
    const todo = await this.findOne(userId, id);
    if (!todo) throw new NotFoundException('Todo not found');

    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
