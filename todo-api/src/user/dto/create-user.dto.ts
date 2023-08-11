import { LoginUserDto } from './login-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
