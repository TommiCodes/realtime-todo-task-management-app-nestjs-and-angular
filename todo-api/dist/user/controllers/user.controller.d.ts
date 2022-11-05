import { UserService } from '../services/user.service';
import { DtoHelperService } from "../dto/dto-helper.service";
import { LoginResponseI, UserI } from "../user.interfaces";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
export declare class UserController {
    private readonly userService;
    private dtoHelperService;
    constructor(userService: UserService, dtoHelperService: DtoHelperService);
    create(createUserDto: CreateUserDto): Promise<UserI>;
    login(loginUserDto: LoginUserDto): Promise<LoginResponseI>;
}
