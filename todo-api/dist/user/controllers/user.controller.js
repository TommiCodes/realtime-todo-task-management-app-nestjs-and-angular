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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const dto_helper_service_1 = require("../dto/dto-helper.service");
const create_user_dto_1 = require("../dto/create-user.dto");
const login_user_dto_1 = require("../dto/login-user.dto");
let UserController = class UserController {
    constructor(userService, dtoHelperService) {
        this.userService = userService;
        this.dtoHelperService = dtoHelperService;
    }
    async create(createUserDto) {
        const userEntity = await this.dtoHelperService.createUserDtoToEntity(createUserDto);
        return this.userService.create(userEntity);
    }
    async login(loginUserDto) {
        const userEntity = await this.dtoHelperService.loginUserDtoToEntity(loginUserDto);
        const jwt = await this.userService.login(userEntity);
        return {
            access_token: jwt,
            token_type: 'JWT',
            expires_in: 10000
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService, dto_helper_service_1.DtoHelperService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map