import { Module } from '@nestjs/common';
import { TodoGateway } from './gateway/todo.gateway';
import {UserModule} from "../user/user.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [UserModule, AuthModule],
  providers: [TodoGateway]
})
export class TodoModule {}
