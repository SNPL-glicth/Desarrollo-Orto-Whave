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
exports.HistoriaClinicaController = void 0;
const common_1 = require("@nestjs/common");
const historia_clinica_service_1 = require("./historia-clinica.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let HistoriaClinicaController = class HistoriaClinicaController {
    constructor(historiaClinicaService) {
        this.historiaClinicaService = historiaClinicaService;
    }
    async crearHistoriaClinica(historiaData, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'doctor') {
            throw new common_1.HttpException('Solo los doctores pueden crear historias clínicas', common_1.HttpStatus.FORBIDDEN);
        }
        historiaData.doctorId = usuario.id;
        return await this.historiaClinicaService.crearHistoriaClinica(historiaData);
    }
    async obtenerHistoriaPorPaciente(pacienteId, req) {
        const usuario = req.user;
        if (usuario.rol.nombre === 'paciente' && pacienteId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para ver esta historia clínica', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.historiaClinicaService.obtenerHistoriaPorPaciente(pacienteId);
    }
    async obtenerHistoriaPorDoctor(doctorId, req) {
        const usuario = req.user;
        if (usuario.rol.nombre === 'doctor' && doctorId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para ver estas historias clínicas', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.historiaClinicaService.obtenerHistoriaPorDoctor(doctorId);
    }
    async obtenerMiHistoria(req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'paciente') {
            throw new common_1.HttpException('Solo los pacientes pueden ver su historia clínica', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.historiaClinicaService.obtenerHistoriaPorPaciente(usuario.id);
    }
    async obtenerMisConsultas(req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'doctor') {
            throw new common_1.HttpException('Solo los doctores pueden ver sus consultas', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.historiaClinicaService.obtenerHistoriaPorDoctor(usuario.id);
    }
    async buscarPorDiagnostico(diagnostico, req) {
        const usuario = req.user;
        if (!['admin', 'doctor'].includes(usuario.rol.nombre)) {
            throw new common_1.HttpException('No tienes permisos para realizar esta búsqueda', common_1.HttpStatus.FORBIDDEN);
        }
        if (!diagnostico) {
            throw new common_1.HttpException('Diagnóstico requerido para la búsqueda', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.historiaClinicaService.buscarHistoriasPorDiagnostico(diagnostico);
    }
    async obtenerEstadisticas(req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para ver estadísticas', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.historiaClinicaService.obtenerEstadisticasHistorias();
    }
    async obtenerUltimaConsulta(pacienteId, doctorId, req) {
        const usuario = req.user;
        if (usuario.rol.nombre === 'paciente' && pacienteId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para ver esta información', common_1.HttpStatus.FORBIDDEN);
        }
        if (usuario.rol.nombre === 'doctor' && doctorId && parseInt(doctorId) !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para ver esta información', common_1.HttpStatus.FORBIDDEN);
        }
        const doctorIdNum = doctorId ? parseInt(doctorId) : undefined;
        return await this.historiaClinicaService.obtenerUltimaConsultaPaciente(pacienteId, doctorIdNum);
    }
    async obtenerHistoriaPorId(id, req) {
        const usuario = req.user;
        const tieneAcceso = await this.historiaClinicaService.verificarAccesoHistoria(id, usuario.id, usuario.rol.nombre);
        if (!tieneAcceso) {
            throw new common_1.HttpException('No tienes permisos para ver esta historia clínica', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.historiaClinicaService.obtenerHistoriaPorId(id);
    }
    async actualizarHistoriaClinica(id, actualizarData, req) {
        const usuario = req.user;
        const tieneAcceso = await this.historiaClinicaService.verificarAccesoHistoria(id, usuario.id, usuario.rol.nombre);
        if (!tieneAcceso) {
            throw new common_1.HttpException('No tienes permisos para modificar esta historia clínica', common_1.HttpStatus.FORBIDDEN);
        }
        if (!['doctor', 'admin'].includes(usuario.rol.nombre)) {
            throw new common_1.HttpException('No tienes permisos para modificar historias clínicas', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.historiaClinicaService.actualizarHistoriaClinica(id, actualizarData);
    }
    async eliminarHistoriaClinica(id, req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('Solo los administradores pueden eliminar historias clínicas', common_1.HttpStatus.FORBIDDEN);
        }
        await this.historiaClinicaService.eliminarHistoriaClinica(id);
        return { message: 'Historia clínica eliminada exitosamente' };
    }
};
exports.HistoriaClinicaController = HistoriaClinicaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HistoriaClinicaController.prototype, "crearHistoriaClinica", null);
__decorate([
    (0, common_1.Get)('paciente/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HistoriaClinicaController.prototype, "obtenerHistoriaPorPaciente", null);
__decorate([
    (0, common_1.Get)('doctor/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HistoriaClinicaController.prototype, "obtenerHistoriaPorDoctor", null);
__decorate([
    (0, common_1.Get)('mi-historia'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HistoriaClinicaController.prototype, "obtenerMiHistoria", null);
__decorate([
    (0, common_1.Get)('mis-consultas'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HistoriaClinicaController.prototype, "obtenerMisConsultas", null);
__decorate([
    (0, common_1.Get)('buscar'),
    __param(0, (0, common_1.Query)('diagnostico')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HistoriaClinicaController.prototype, "buscarPorDiagnostico", null);
__decorate([
    (0, common_1.Get)('estadisticas'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HistoriaClinicaController.prototype, "obtenerEstadisticas", null);
__decorate([
    (0, common_1.Get)('paciente/:pacienteId/ultima'),
    __param(0, (0, common_1.Param)('pacienteId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('doctorId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], HistoriaClinicaController.prototype, "obtenerUltimaConsulta", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HistoriaClinicaController.prototype, "obtenerHistoriaPorId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], HistoriaClinicaController.prototype, "actualizarHistoriaClinica", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], HistoriaClinicaController.prototype, "eliminarHistoriaClinica", null);
exports.HistoriaClinicaController = HistoriaClinicaController = __decorate([
    (0, common_1.Controller)('historia-clinica'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [historia_clinica_service_1.HistoriaClinicaService])
], HistoriaClinicaController);
//# sourceMappingURL=historia-clinica.controller.js.map