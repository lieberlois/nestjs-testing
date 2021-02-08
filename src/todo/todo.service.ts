import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    // Für JOIN Lösung:
    // return this.todoRepository.find({relations: ["author"]})
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo | null> {
    const todo = await this.todoRepository.findOne(id);
    return todo || null;
  }

  async create(text: string, authorId: number): Promise<Todo> {
    const todo = this.todoRepository.create({ text, authorId });
    return await this.todoRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
