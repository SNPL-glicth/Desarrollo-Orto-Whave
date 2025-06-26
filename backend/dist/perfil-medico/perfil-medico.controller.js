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
exports.PerfilMedicoController = void 0;
const common_1 = require("@nestjs/common");
const perfil_medico_service_1 = require("./perfil-medico.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PerfilMedicoController = class PerfilMedicoController {
    constructor(perfilMedicoService) {
        this.perfilMedicoService = perfilMedicoService;
    }
    async obtenerTodosLosDoctores(req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para ver esta información', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.perfilMedicoService.obtenerTodosLosDoctores();
    }
    async obtenerDoctoresDisponibles() {
        return await this.perfilMedicoService.obtenerDoctoresDisponibles();
    }
    async obtenerMiPerfil(req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'doctor') {
            throw new common_1.HttpException('Solo los doctores tienen perfil médico', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.perfilMedicoService.obtenerPorUsuarioId(usuario.id);
    }
    async obtenerPerfilPorUsuario(usuarioId, req) {
        const usuario = req.user;
        if (usuario.rol.nombre === 'doctor' && usuarioId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para ver este perfil', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.perfilMedicoService.obtenerPorUsuarioId(usuarioId);
    }
    async crearPerfil(perfilData, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin' && perfilData.usuarioId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para crear este perfil', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.perfilMedicoService.crearPerfilMedico(perfilData);
    }
    async actualizarMiPerfil(actualizarData, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'doctor') {
            throw new common_1.HttpException('Solo los doctores pueden actualizar perfil médico', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.perfilMedicoService.actualizarPerfil(usuario.id, actualizarData);
    }
    async actualizarPerfil(usuarioId, actualizarData, req) {
        const usuario = req.user;
        if (usuario.rol.nombre === 'doctor' && usuarioId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para actualizar este perfil', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.perfilMedicoService.actualizarPerfil(usuarioId, actualizarData);
    }
};
exports.PerfilMedicoController = PerfilMedicoController;
__decorate([
    (0, common_1.Get)('doctores'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilMedicoController.prototype, "obtenerTodosLosDoctores", null);
__decorate([
    (0, common_1.Get)('doctores-disponibles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerfilMedicoController.prototype, "obtenerDoctoresDisponibles", null);
__decorate([
    (0, common_1.Get)('mi-perfil'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PerfilMedicoController.prototype, "obtenerMiPerfil", null);
__decorate([
    (0, common_1.Get)('usuario/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PerfilMedicoController.prototype, "obtenerPerfilPorUsuario", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PerfilMedicoController.prototype, "crearPerfil", null);
__decorate([
    (0, common_1.Patch)('mi-perfil'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PerfilMedicoController.prototype, "actualizarMiPerfil", null);
__decorate([
    (0, common_1.Patch)('usuario/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], PerfilMedicoController.prototype, "actualizarPerfil", null);
exports.PerfilMedicoController = PerfilMedicoController = __decorate([
    (0, common_1.Controller)('perfil-medico'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [perfil_medico_service_1.PerfilMedicoService])
], PerfilMedicoController);
//# sourceMappingURL=perfil-medico.controller.js.map