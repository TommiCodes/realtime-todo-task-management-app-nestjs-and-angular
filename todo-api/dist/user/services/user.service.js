"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../../auth/services/auth.service");
let UserService = class UserService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    async create(newUser) {
        const emailExists = await this.mailExists(newUser.email);
        const usernameExists = await this.usernameExists(newUser.username);
        if (emailExists === false && usernameExists === false) {
            const passwordHash = await this.authService.hashPassword(newUser.password);
            newUser.password = passwordHash;
            newUser.email = newUser.email.toLowerCase();
            newUser.username = newUser.username.toLowerCase();
            const user = await this.userRepository.save(this.userRepository.create(newUser));
            return this.findOne(user.id);
        }
        else {
            throw new common_1.HttpException('Email or Username already taken', common_1.HttpStatus.CONFLICT);
        }
    }
    async login(user) {
        const foundUser = await this.findByEmail(user.email);
        if (foundUser) {
            const passwordsMatching = await this.authService.comparePasswords(user.password, foundUser.password);
            if (passwordsMatching === true) {
                const payload = await this.findOne(foundUser.id);
                return this.authService.generateJwt(payload);
            }
            else {
                throw new common_1.HttpException('Login was not successfull, wrong credentils', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getOneById(id) {
        return this.userRepository.findOneOrFail({
            where: {
                id: id
            }
        });
    }
    async findByEmail(email) {
        return this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'username']
        });
    }
    async findOne(id) {
        return this.userRepository.findOne({
            where: { id }
        });
    }
    async mailExists(email) {
        const user = await this.userRepository.findOne({
            where: { email }
        });
        return !!user;
    }
    async usernameExists(username) {
        const user = await this.userRepository.findOne({
            where: { username }
        });
        return !!user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map