import { IsEmail, IsNotEmpty } from 'class-validator';

// with the dtos we can check if the payload that the user sends fullfills our conditions, for example, if the mail is an email
export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
