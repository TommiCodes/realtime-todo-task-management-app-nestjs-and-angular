import { ConnectionI } from '../todo/todo.interface';

export interface UserI {
  id?: number;
  username?: string;
  email: string;
  password?: string;
  connections?: ConnectionI[];
}

export interface LoginResponseI {
  access_token: string;
  token_type: string;
  expires_in: number;
}
