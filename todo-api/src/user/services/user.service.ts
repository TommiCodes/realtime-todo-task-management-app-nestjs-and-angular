import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/services/auth.service';
import { UserI } from '../user.interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(newUser: UserI): Promise<UserI> {
    const emailExists: boolean = await this.mailExists(newUser.email);
    const usernameExists: boolean = await this.usernameExists(newUser.username);

    if (emailExists === false && usernameExists === false) {
      const passwordHash: string = await this.authService.hashPassword(
        newUser.password,
      );
      newUser.password = passwordHash;
      newUser.email = newUser.email.toLowerCase();
      newUser.username = newUser.username.toLowerCase();

      const user = await this.userRepository.save(
        this.userRepository.create(newUser),
      );
      return this.findOne(user.id);
    } else {
      throw new HttpException(
        'Email or Username already taken',
        HttpStatus.CONFLICT,
      );
    }
  }

  async login(user: UserI): Promise<string> {
    const foundUser: UserI = await this.findByEmail(user.email);

    if (foundUser) {
      const passwordsMatching: boolean =
        await this.authService.comparePasswords(
          user.password,
          foundUser.password,
        );

      if (passwordsMatching === true) {
        const payload: UserI = await this.findOne(foundUser.id);
        return this.authService.generateJwt(payload);
      } else {
        throw new HttpException(
          'Login was not successfull, wrong credentils',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async getOneById(id: number): Promise<UserI> {
    return this.userRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  private async findByEmail(email: string): Promise<UserI> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'username'],
    });
  }

  private async findOne(id: number): Promise<UserI> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  private async mailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return !!user;
  }

  private async usernameExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return !!user;
  }
}
