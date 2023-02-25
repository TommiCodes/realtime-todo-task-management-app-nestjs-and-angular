import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TodoItem} from "../../private-module.interfaces";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateTodoComponent} from "../create-todo/create-todo.component";
import {todoExampleItems} from "../../private-module.constants";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  createTodoComponentDialogRef: MatDialogRef<CreateTodoComponent> | undefined;

  backlogItems: TodoItem[] = [];
  todoItems: TodoItem[] = [];
  doneItems: TodoItem[] = [];

  items: TodoItem[] = todoExampleItems;

  constructor(private todoService: TodoService, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.todoService.sendMessage();
    this.todoService.getTodos();

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

  onShowCreateTodoDialog() {
    this.createTodoComponentDialogRef = this.matDialog.open(CreateTodoComponent, {
      minHeight: '400px',
      minWidth: '300px'
    });
  }

}
