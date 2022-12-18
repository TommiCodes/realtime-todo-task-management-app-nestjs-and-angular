import {OnGatewayConnection, WebSocketGateway} from '@nestjs/websockets';
import {UserService} from "../../user/services/user.service";
import {AuthService} from "../../auth/services/auth.service";
import {Socket} from "socket.io";
import {UnauthorizedException} from "@nestjs/common";
import {UserI} from "../../user/user.interfaces";

@WebSocketGateway({   namespace: 'todos', cors: {origin: ['http://localhost:3000', 'http://localhost:4200']}})
export class TodoGateway implements OnGatewayConnection{

  constructor(private userService: UserService, private authService: AuthService) {
  }

  async handleConnection(socket: Socket) {
    try {
    // if the token is not verified, this will throw and we can catch & disconnect the user
    const decodedToken = await this.authService.verifyJwt(socket.handshake.auth.Authorization);
    // if the token is valid, we get the user by id from our database
    const user: UserI = await this.userService.getOneById(decodedToken.user.id);

      if(!user){
        console.log('disconnect user');
        return this.disconnect(socket);
      } else {
        console.log('do smth', user);
      }
    } catch {
      console.log('disconnect user')
      return this.disconnect(socket);
    }
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}
