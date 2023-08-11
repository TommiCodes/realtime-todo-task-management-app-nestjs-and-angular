import {Injectable} from "@angular/core";
import {io} from "socket.io-client";
import {tokenGetter} from "../../app.module";
import {Status, TodoItem} from "../private-module.interfaces";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // @ts-ignore
  public todoItems$: BehaviorSubject<TodoItem[]> = new BehaviorSubject([]);

  socket = io('http://localhost:3000/todos', {
    auth: {
      Authorization: tokenGetter()
    }
  })

  public getTodos() {
    this.socket.on('todos', (todos: TodoItem[]) => {
      this.todoItems$.next(todos);
    })
  }

  public saveTodo(todoItem: TodoItem) {
    this.socket.emit('addTodo', todoItem);
  }

  public getAddedTodo() {
    this.socket.on('addedTodo', (todo: TodoItem) => {
      this.todoItems$.next([...this.todoItems$.value, todo]);
    })
  }

  public updateTodo(updatedItem: TodoItem, containerId: string) {
    updatedItem.status = this.convertListIdToStatus(containerId);
    this.socket.emit('updateTodo', updatedItem);
  }

  public getUpdatedTodo() {
    this.socket.on('updatedTodo', (todoItem: TodoItem) => {
      const itemIndex = this.todoItems$.value.findIndex(i => i.id === todoItem.id);

      let items: TodoItem[] = this.todoItems$.value;
      items[itemIndex] = todoItem;
      this.todoItems$.next(items);
    })
  }

  private convertListIdToStatus(listId: string): Status {
    switch (listId){
      case 'cdk-drop-list-0':
        return 'BACKLOG'
      case 'cdk-drop-list-1':
        return 'TODO'
      case 'cdk-drop-list-2':
        return 'DONE'
      default:
        return 'BACKLOG';
    }
  }

}
