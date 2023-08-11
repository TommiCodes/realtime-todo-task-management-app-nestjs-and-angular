import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoItem } from '../todo.interface';

@Injectable()
export class SetupService implements OnApplicationBootstrap {
  constructor(private todoService: TodoService) {}

  onApplicationBootstrap(): any {
    const items: TodoItem[] = [
      {
        title: 'Hard Item',
        complexity: 'HARD',
        subTitle: 'Hard Subtitle',
        text: 'Hard Text',
        status: 'BACKLOG',
      },
      {
        title: 'Medium Item',
        complexity: 'MEDIUM',
        subTitle: 'Medium Subtitle',
        text: 'Medium Text',
        status: 'TODO',
      },
      {
        title: 'Easy Item',
        complexity: 'EASY',
        subTitle: 'Easy Subtitle',
        text: 'Easy Text',
        status: 'DONE',
      },
      {
        title: 'Example Item',
        complexity: 'MEDIUM',
        subTitle: 'Example Subtitle',
        text: 'Example Text',
        status: 'DONE',
      },
    ];
    this.todoService.saveAll(items);
  }
}
