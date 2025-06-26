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
exports.PacientesController = void 0;
const common_1 = require("@nestjs/common");
const pacientes_service_1 = require("./pacientes.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PacientesController = class PacientesController {
    constructor(pacientesService) {
        this.pacientesService = pacientesService;
    }
    async obtenerTodosLosPacientes(req) {
        const usuario = req.user;
        if (!['admin', 'doctor'].includes(usuario.rol.nombre)) {
            throw new common_1.HttpException('No tienes permisos para ver esta información', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.pacientesService.obtenerTodosLosPacientes();
    }
    async obtenerMisPacientes(req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'doctor') {
            throw new common_1.HttpException('Solo los doctores pueden ver sus pacientes', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.pacientesService.obtenerPacientesPorDoctor(usuario.id);
    }
    async obtenerMiPerfil(req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'paciente') {
            throw new common_1.HttpException('Solo los pacientes tienen perfil de paciente', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            return await this.pacientesService.obtenerPorUsuarioId(usuario.id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return {
                    usuarioId: usuario.id,
                    usuario: {
                        id: usuario.id,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        email: usuario.email,
                        telefono: usuario.telefono
                    }
                };
            }
            throw error;
        }
    }
    async buscarPaciente(identificacion, req) {
        const usuario = req.user;
        if (!['admin', 'doctor'].includes(usuario.rol.nombre)) {
            throw new common_1.HttpException('No tienes permisos para buscar pacientes', common_1.HttpStatus.FORBIDDEN);
        }
        if (!identificacion) {
            throw new common_1.HttpException('Número de identificación requerido', common_1.HttpStatus.BAD_REQUEST);
        }
        const paciente = await this.pacientesService.buscarPacientePorIdentificacion(identificacion);
        if (!paciente) {
            throw new common_1.HttpException('Paciente no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        return paciente;
    }
    async obtenerEstadisticas(req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para ver estadísticas', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.pacientesService.obtenerEstadisticasPacientes();
    }
    async obtenerPacientePorUsuario(usuarioId, req) {
        const usuario = req.user;
        if (usuario.rol.nombre === 'paciente' && usuarioId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para ver esta información', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.pacientesService.obtenerPorUsuarioId(usuarioId);
    }
    async crearPaciente(pacienteData, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin' && pacienteData.usuarioId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para crear este perfil', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.pacientesService.crearPaciente(pacienteData);
    }
    async actualizarMiPerfil(actualizarData, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'paciente') {
            throw new common_1.HttpException('Solo los pacientes pueden actualizar su perfil', common_1.HttpStatus.BAD_REQUEST);
        }
        const existe = await this.pacientesService.verificarPacienteExiste(usuario.id);
        if (!existe) {
            const datosBasicos = {
                usuarioId: usuario.id,
                ...actualizarData
            };
            return await this.pacientesService.crearPaciente(datosBasicos);
        }
        return await this.pacientesService.actualizarPaciente(usuario.id, actualizarData);
    }
    async actualizarPaciente(usuarioId, actualizarData, req) {
        const usuario = req.user;
        if (usuario.rol.nombre === 'paciente' && usuarioId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para actualizar esta información', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.pacientesService.actualizarPaciente(usuarioId, actualizarData);
    }
    async marcarPrimeraConsultaCompleta(usuarioId, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'doctor') {
            throw new common_1.HttpException('Solo los doctores pueden realizar esta acción', common_1.HttpStatus.FORBIDDEN);
        }
        await this.pacientesService.marcarPrimeraConsultaCompleta(usuarioId);
        return { message: 'Primera consulta marcada como completa' };
    }
};
exports.PacientesController = PacientesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "obtenerTodosLosPacientes", null);
__decorate([
    (0, common_1.Get)('mis-pacientes'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "obtenerMisPacientes", null);
__decorate([
    (0, common_1.Get)('mi-perfil'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "obtenerMiPerfil", null);
__decorate([
    (0, common_1.Get)('buscar'),
    __param(0, (0, common_1.Query)('identificacion')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "buscarPaciente", null);
__decorate([
    (0, common_1.Get)('estadisticas'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "obtenerEstadisticas", null);
__decorate([
    (0, common_1.Get)('usuario/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "obtenerPacientePorUsuario", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "crearPaciente", null);
__decorate([
    (0, common_1.Patch)('mi-perfil'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "actualizarMiPerfil", null);
__decorate([
    (0, common_1.Patch)('usuario/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "actualizarPaciente", null);
__decorate([
    (0, common_1.Patch)('usuario/:id/primera-consulta'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "marcarPrimeraConsultaCompleta", null);
exports.PacientesController = PacientesController = __decorate([
    (0, common_1.Controller)('pacientes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [pacientes_service_1.PacientesService])
], PacientesController);
//# sourceMappingURL=pacientes.controller.js.map