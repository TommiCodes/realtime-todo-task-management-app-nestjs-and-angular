import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoItem } from '../todo.interface';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<TodoItem[]> {
    return this.todoRepository.find();
  }

  saveAll(todoItems: TodoItem[]): Promise<TodoItem[]> {
    return this.todoRepository.save(todoItems);
  }
}
