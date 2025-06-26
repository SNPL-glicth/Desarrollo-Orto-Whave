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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService, mailerService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async validateUser(email, password) {
        const user = await this.usersRepository.findOne({
            where: { email },
            relations: ['rol'],
        });
        if (!user) {
            return null;
        }
        if (!user.isVerified) {
            throw new common_1.UnauthorizedException('La cuenta no ha sido verificada. Por favor revisa tu correo.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = {
            email: user.email,
            sub: user.id,
            rol: user.rol.nombre,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                rol: user.rol.nombre,
            },
            redirect: this.getRedirectPath(user.rol.nombre),
        };
    }
    async register(userData) {
        if (!userData.nombre || !userData.apellido || !userData.email || !userData.password) {
            throw new common_1.BadRequestException('Todos los campos (nombre, apellido, email y contraseña) son obligatorios.');
        }
        const existingUser = await this.usersRepository.findOne({
            where: { email: userData.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('El correo electrónico ya está registrado');
        }
        const rolId = userData.rolId || 3;
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        const newUser = this.usersRepository.create({
            ...userData,
            password: hashedPassword,
            rolId,
            isVerified: false,
            verificationCode,
        });
        await this.usersRepository.save(newUser);
        try {
            await this.mailerService.sendMail({
                to: userData.email,
                subject: 'Verifica tu cuenta en Orto-Whave',
                template: './verification',
                context: {
                    verificationCode,
                    email: userData.email,
                },
            });
        }
        catch (error) {
            console.error('Error al enviar correo de verificación:', error);
        }
        return {
            message: 'Usuario registrado exitosamente. Por favor revisa tu correo para verificar tu cuenta.',
            email: userData.email,
        };
    }
    async verifyCode(email, code) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        if (user.isVerified) {
            return { message: 'La cuenta ya está verificada.' };
        }
        if (user.verificationCode !== code) {
            throw new common_1.UnauthorizedException('Código de verificación incorrecto');
        }
        user.isVerified = true;
        user.verificationCode = null;
        await this.usersRepository.save(user);
        return { message: 'Cuenta verificada exitosamente.' };
    }
    getRedirectPath(rol) {
        const redirectPaths = {
            admin: '/dashboard/admin',
            doctor: '/dashboard/doctor',
            paciente: '/dashboard/patient',
        };
        return redirectPaths[rol] || '/';
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map