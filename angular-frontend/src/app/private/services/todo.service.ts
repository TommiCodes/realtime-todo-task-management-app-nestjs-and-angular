import {Injectable} from "@angular/core";
import {io} from "socket.io-client";
import {tokenGetter} from "../../app.module";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  socket = io('http://localhost:3000/todos', {
    auth: {
      Authorization: tokenGetter()
    }
  })

  public sendMessage() {
    this.socket.emit('message', 'message');
  }

}
