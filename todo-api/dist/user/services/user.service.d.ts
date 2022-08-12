import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export interface Test {
    title: string;
}
export declare class UserService {
    create(createUserDto: CreateUserDto): string;
    findAll(): string;
    findOne(id: number): {
        title: string;
    };
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
