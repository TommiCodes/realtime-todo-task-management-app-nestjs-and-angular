import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { AuthService } from "../../auth/services/auth.service";
import { UserI } from "../user.interfaces";
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<User>, authService: AuthService);
    create(newUser: UserI): Promise<UserI>;
    login(user: UserI): Promise<string>;
    private findByEmail;
    private findOne;
    private mailExists;
    private usernameExists;
}
