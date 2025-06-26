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
exports.CitasController = void 0;
const common_1 = require("@nestjs/common");
const citas_service_1 = require("./citas.service");
const crear_cita_dto_1 = require("./dto/crear-cita.dto");
const actualizar_estado_cita_dto_1 = require("./dto/actualizar-estado-cita.dto");
const buscar_disponibilidad_dto_1 = require("./dto/buscar-disponibilidad.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CitasController = class CitasController {
    constructor(citasService) {
        this.citasService = citasService;
    }
    async crearCita(crearCitaDto, req) {
        try {
            const usuario = req.user;
            if (usuario.rol.nombre === 'paciente' && crearCitaDto.pacienteId !== usuario.id) {
                throw new common_1.HttpException('No tienes permisos para crear citas para otro paciente', common_1.HttpStatus.FORBIDDEN);
            }
            return await this.citasService.crearCita(crearCitaDto);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async obtenerCitasPorPaciente(pacienteId, req) {
        const usuario = req.user;
        if (usuario.rol.nombre === 'paciente' && pacienteId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para ver las citas de otro paciente', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.citasService.obtenerCitasPorPaciente(pacienteId);
    }
    async obtenerCitasPorDoctor(doctorId, req) {
        const usuario = req.user;
        if (usuario.rol.nombre === 'doctor' && doctorId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para ver las citas de otro doctor', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.citasService.obtenerCitasPorDoctor(doctorId);
    }
    async obtenerMisCitas(req) {
        const usuario = req.user;
        if (usuario.rol.nombre === 'paciente') {
            return await this.citasService.obtenerCitasPorPaciente(usuario.id);
        }
        else if (usuario.rol.nombre === 'doctor') {
            return await this.citasService.obtenerCitasPorDoctor(usuario.id);
        }
        else {
            throw new common_1.HttpException('Rol no válido para obtener citas', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async obtenerCitasPendientesAprobacion(req) {
        const usuario = req.user;
        if (usuario.rol.nombre !== 'admin') {
            throw new common_1.HttpException('No tienes permisos para ver las citas pendientes de aprobación', common_1.HttpStatus.FORBIDDEN);
        }
        return await this.citasService.obtenerCitasPendientesAprobacion();
    }
    async buscarDisponibilidad(buscarDisponibilidadDto) {
        return await this.citasService.buscarDisponibilidad(buscarDisponibilidadDto);
    }
    async obtenerCitaPorId(id, req) {
        const cita = await this.citasService.obtenerCitaPorId(id);
        const usuario = req.user;
        if (usuario.rol.nombre === 'paciente' && cita.pacienteId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para ver esta cita', common_1.HttpStatus.FORBIDDEN);
        }
        if (usuario.rol.nombre === 'doctor' && cita.doctorId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para ver esta cita', common_1.HttpStatus.FORBIDDEN);
        }
        return cita;
    }
    async actualizarEstadoCita(id, actualizarEstadoDto, req) {
        const usuario = req.user;
        const cita = await this.citasService.obtenerCitaPorId(id);
        if (actualizarEstadoDto.estado === 'aprobada' || actualizarEstadoDto.estado === 'cancelada') {
            if (usuario.rol.nombre !== 'admin') {
                throw new common_1.HttpException('No tienes permisos para aprobar o cancelar citas', common_1.HttpStatus.FORBIDDEN);
            }
            actualizarEstadoDto.aprobadaPor = usuario.id;
        }
        else if (actualizarEstadoDto.estado === 'confirmada') {
            if (usuario.rol.nombre === 'paciente' && cita.pacienteId !== usuario.id) {
                throw new common_1.HttpException('No tienes permisos para confirmar esta cita', common_1.HttpStatus.FORBIDDEN);
            }
        }
        else if (['en_curso', 'completada', 'no_asistio'].includes(actualizarEstadoDto.estado)) {
            if (usuario.rol.nombre === 'doctor' && cita.doctorId !== usuario.id) {
                throw new common_1.HttpException('No tienes permisos para actualizar el estado de esta cita', common_1.HttpStatus.FORBIDDEN);
            }
        }
        return await this.citasService.actualizarEstadoCita(id, actualizarEstadoDto);
    }
    async eliminarCita(id, req) {
        const usuario = req.user;
        const cita = await this.citasService.obtenerCitaPorId(id);
        if (usuario.rol.nombre === 'paciente') {
            if (cita.pacienteId !== usuario.id || cita.estado !== 'pendiente') {
                throw new common_1.HttpException('No tienes permisos para eliminar esta cita', common_1.HttpStatus.FORBIDDEN);
            }
        }
        else if (usuario.rol.nombre === 'doctor') {
            throw new common_1.HttpException('Los doctores no pueden eliminar citas', common_1.HttpStatus.FORBIDDEN);
        }
        await this.citasService.eliminarCita(id);
        return { message: 'Cita eliminada exitosamente' };
    }
    async obtenerAgendaDoctor(doctorId, fecha, req) {
        const usuario = req.user;
        if (usuario.rol.nombre === 'doctor' && doctorId !== usuario.id) {
            throw new common_1.HttpException('No tienes permisos para ver la agenda de otro doctor', common_1.HttpStatus.FORBIDDEN);
        }
        const citas = await this.citasService.obtenerCitasPorDoctor(doctorId);
        const citasDelDia = citas.filter(cita => {
            const fechaCita = new Date(cita.fechaHora).toISOString().split('T')[0];
            return fechaCita === fecha;
        });
        const disponibilidad = await this.citasService.buscarDisponibilidad({
            doctorId,
            fecha,
            duracion: 60
        });
        return {
            fecha,
            citas: citasDelDia,
            horariosDisponibles: disponibilidad
        };
    }
};
exports.CitasController = CitasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_cita_dto_1.CrearCitaDto, Object]),
    __metadata("design:returntype", Promise)
], CitasController.prototype, "crearCita", null);
__decorate([
    (0, common_1.Get)('paciente/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CitasController.prototype, "obtenerCitasPorPaciente", null);
__decorate([
    (0, common_1.Get)('doctor/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CitasController.prototype, "obtenerCitasPorDoctor", null);
__decorate([
    (0, common_1.Get)('mis-citas'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CitasController.prototype, "obtenerMisCitas", null);
__decorate([
    (0, common_1.Get)('pendientes-aprobacion'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CitasController.prototype, "obtenerCitasPendientesAprobacion", null);
__decorate([
    (0, common_1.Get)('disponibilidad'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [buscar_disponibilidad_dto_1.BuscarDisponibilidadDto]),
    __metadata("design:returntype", Promise)
], CitasController.prototype, "buscarDisponibilidad", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CitasController.prototype, "obtenerCitaPorId", null);
__decorate([
    (0, common_1.Patch)(':id/estado'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, actualizar_estado_cita_dto_1.ActualizarEstadoCitaDto, Object]),
    __metadata("design:returntype", Promise)
], CitasController.prototype, "actualizarEstadoCita", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CitasController.prototype, "eliminarCita", null);
__decorate([
    (0, common_1.Get)('doctor/:doctorId/agenda/:fecha'),
    __param(0, (0, common_1.Param)('doctorId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fecha')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], CitasController.prototype, "obtenerAgendaDoctor", null);
exports.CitasController = CitasController = __decorate([
    (0, common_1.Controller)('citas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [citas_service_1.CitasService])
], CitasController);
//# sourceMappingURL=citas.controller.js.map