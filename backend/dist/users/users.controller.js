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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const users_service_1 = require("./users.service");
const crear_usuario_admin_dto_1 = require("./dto/crear-usuario-admin.dto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersController = class UsersController {
    constructor(usersService, usersRepository) {
        this.usersService = usersService;
        this.usersRepository = usersRepository;
    }
    async getProfile(req) {
        const user = await this.usersRepository.findOne({
            where: { id: req.user.sub },
            relations: ['rol'],
        });
        if (!user)
            throw new Error('Usuario no encontrado');
        const { password, ...userData } = user;
        return userData;
    }
    async updateProfile(req, updateData) {
        const user = await this.usersRepository.findOne({ where: { id: req.user.sub } });
        if (!user)
            throw new Error('Usuario no encontrado');
        user.nombre = updateData.nombre || user.nombre;
        user.apellido = updateData.apellido || user.apellido;
        user.telefono = updateData.telefono || user.telefono;
        user.direccion = updateData.direccion || user.direccion;
        await this.usersRepository.save(user);
        const { password, ...userData } = user;
        return userData;
    }
    async crearUsuarioAdmin(crearUsuarioDto, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para crear usuarios', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.usersService.crearUsuarioAdmin(crearUsuarioDto);
    }
    async obtenerTodosLosUsuarios(req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para ver esta información', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.usersService.obtenerTodosLosUsuarios();
    }
    async obtenerUsuariosPorRol(rol, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para ver esta información', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.usersService.obtenerUsuariosPorRol(rol);
    }
    async buscarUsuarios(termino, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para realizar búsquedas', common_1.HttpStatus.FORBIDDEN);
        }
        if (!termino) {
            throw new common_1.HttpException('Término de búsqueda requerido', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.usersService.buscarUsuarios(termino);
    }
    async obtenerEstadisticasUsuarios(req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para ver estadísticas', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.usersService.obtenerEstadisticasUsuarios();
    }
    async obtenerUsuarioPorId(id, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para ver esta información', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.usersService.obtenerUsuarioPorId(id);
    }
    async actualizarUsuario(id, actualizarData, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para actualizar usuarios', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.usersService.actualizarUsuario(id, actualizarData);
    }
    async cambiarEstadoUsuario(id, activo, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para cambiar el estado de usuarios', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.usersService.cambiarEstadoUsuario(id, activo);
    }
    async eliminarUsuario(id, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para eliminar usuarios', common_1.HttpStatus.FORBIDDEN);
        }
        if (id === usuario.id) {
            throw new common_1.HttpException('No puedes eliminarte a ti mismo', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.usersService.eliminarUsuario(id);
        return { message: 'Usuario eliminado exitosamente' };
    }
    async verificarEmailDisponible(email) {
        const disponible = await this.usersService.verificarEmailDisponible(email);
        return { disponible };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('me'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('admin/crear-usuario'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_usuario_admin_dto_1.CrearUsuarioAdminDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "crearUsuarioAdmin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('admin/todos'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "obtenerTodosLosUsuarios", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('admin/por-rol/:rol'),
    __param(0, (0, common_1.Param)('rol')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "obtenerUsuariosPorRol", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('admin/buscar'),
    __param(0, (0, common_1.Query)('termino')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "buscarUsuarios", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('admin/estadisticas'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "obtenerEstadisticasUsuarios", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('admin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "obtenerUsuarioPorId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('admin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "actualizarUsuario", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('admin/:id/estado'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('activo')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "cambiarEstadoUsuario", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('admin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "eliminarUsuario", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('verificar-email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verificarEmailDisponible", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        typeorm_2.Repository])
], UsersController);
//# sourceMappingURL=users.controller.js.map