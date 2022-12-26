import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TodoItem} from "../../interfaces";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  backlogItems: TodoItem[] = [];
  todoItems: TodoItem[] = [];
  doneItems: TodoItem[] = [];

  items: TodoItem[] = [
    {
      title: 'Hard Item',
      complexity: 'HARD',
      subTitle: 'Hard Subtitle',
      text: 'Hard Text',
      status: 'BACKLOG'
    },
    {
      title: 'Medium Item',
      complexity: 'MEDIUM',
      subTitle: 'Medium Subtitle',
      text: 'Medium Text',
      status: 'TODO'
    },
    {
      title: 'Easy Item',
      complexity: 'EASY',
      subTitle: 'Easy Subtitle',
      text: 'Easy Text',
      status: 'DONE'
    },
    {
      title: 'Example Item',
      complexity: 'MEDIUM',
      subTitle: 'Example Subtitle',
      text: 'Example Text',
      status: 'DONE'
    }
  ]

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.sendMessage();

    // refactor in next stories
    this.backlogItems = this.items.filter(item => item.status === 'BACKLOG');
    this.todoItems = this.items.filter(item => item.status === 'TODO');
    this.doneItems = this.items.filter(item => item.status === 'DONE');
  }

  drop(event: CdkDragDrop<TodoItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
