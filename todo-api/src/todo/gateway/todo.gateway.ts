import {
  OnGatewayConnection,
  OnGatewayDisconnect, SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserService } from '../../user/services/user.service';
import { AuthService } from '../../auth/services/auth.service';
import { Server, Socket } from 'socket.io';
import { UnauthorizedException } from '@nestjs/common';
import { UserI } from '../../user/user.interfaces';
import { ConnectionService } from '../services/connection.service';
import { TodoService } from '../services/todo.service';
import {ConnectionI, TodoItem} from "../todo.interface";

@WebSocketGateway({
  namespace: 'todos',
  cors: { origin: ['http://localhost:3000', 'http://localhost:4200'] },
})
export class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private connectionService: ConnectionService,
    private todoService: TodoService,
  ) {}

  async handleConnection(socket: Socket) {
    try {
      // if the token is not verified, this will throw and we can catch & disconnect the user
      const decodedToken = await this.authService.verifyJwt(
        socket.handshake.auth.Authorization,
      );
      // if the token is valid, we get the user by id from our database
      const user: UserI = await this.userService.getOneById(
        decodedToken.user.id,
      );

      if (!user) {
        console.log('disconnect user');
        return this.disconnect(socket);
      } else {
        console.log('do smth', user);

        // save the connection of the user in our database
        await this.connectionService.create({
          socketId: socket.id,
          connectedUser: user,
        });

        // get all todos from our database
        const todos = await this.todoService.findAll();

        // Only emit todos to the specific connected client
        return this.server.to(socket.id).emit('todos', todos);
      }
    } catch {
      console.log('disconnect user');
      return this.disconnect(socket);
    }
  }

  async handleDisconnect(socket: Socket) {
    // remove the connection from our db
    await this.connectionService.deleteBySocketId(socket.id);
    socket.disconnect();
  }

  @SubscribeMessage('addTodo')
  async onAddTodo(socket: Socket, todoItem: TodoItem) {
    // save new todoItem to our Database
    const createdTodoItem: TodoItem = await this.todoService.save(todoItem);

    // publish the new totoItem to all connected Users
    const connections: ConnectionI[] = await this.connectionService.findAll();
    for (const connection of connections) {
      this.server.to(connection.socketId).emit('addedTodo', createdTodoItem);
    }
  }

  @SubscribeMessage('updateTodo')
  async onUpdateTodo(socket: Socket, todoItem: TodoItem) {
    // update todoItem in Database
    const updatedTodoItem: TodoItem = await this.todoService.update(todoItem);

    // publish the updatedItem to all connected Users
    const connections: ConnectionI[] = await this.connectionService.findAll();
    for (const connection of connections) {
      this.server.to(connection.socketId).emit('updatedTodo', updatedTodoItem);
    }
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}
