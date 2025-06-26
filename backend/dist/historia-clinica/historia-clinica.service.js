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
exports.HistoriaClinicaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const historia_clinica_entity_1 = require("./entities/historia-clinica.entity");
const user_entity_1 = require("../users/entities/user.entity");
let HistoriaClinicaService = class HistoriaClinicaService {
    constructor(historiaClinicaRepository, usersRepository) {
        this.historiaClinicaRepository = historiaClinicaRepository;
        this.usersRepository = usersRepository;
    }
    async crearHistoriaClinica(historiaData) {
        const historia = this.historiaClinicaRepository.create(historiaData);
        return await this.historiaClinicaRepository.save(historia);
    }
    async obtenerHistoriaPorPaciente(pacienteId) {
        return await this.historiaClinicaRepository.find({
            where: { pacienteId },
            relations: ['doctor', 'cita'],
            order: { fechaConsulta: 'DESC' }
        });
    }
    async obtenerHistoriaPorDoctor(doctorId) {
        return await this.historiaClinicaRepository.find({
            where: { doctorId },
            relations: ['paciente', 'cita'],
            order: { fechaConsulta: 'DESC' }
        });
    }
    async obtenerHistoriaPorId(id) {
        const historia = await this.historiaClinicaRepository.findOne({
            where: { id },
            relations: ['paciente', 'doctor', 'cita']
        });
        if (!historia) {
            throw new common_1.NotFoundException('Historia clínica no encontrada');
        }
        return historia;
    }
    async actualizarHistoriaClinica(id, actualizarData) {
        const historia = await this.obtenerHistoriaPorId(id);
        Object.assign(historia, actualizarData);
        return await this.historiaClinicaRepository.save(historia);
    }
    async eliminarHistoriaClinica(id) {
        const historia = await this.obtenerHistoriaPorId(id);
        await this.historiaClinicaRepository.remove(historia);
    }
    async obtenerUltimaConsultaPaciente(pacienteId, doctorId) {
        const whereClause = { pacienteId };
        if (doctorId) {
            whereClause.doctorId = doctorId;
        }
        return await this.historiaClinicaRepository.findOne({
            where: whereClause,
            relations: ['doctor', 'cita'],
            order: { fechaConsulta: 'DESC' }
        });
    }
    async verificarAccesoHistoria(historiaId, usuarioId, rolUsuario) {
        const historia = await this.obtenerHistoriaPorId(historiaId);
        if (rolUsuario === 'admin') {
            return true;
        }
        if (rolUsuario === 'doctor' && historia.doctorId === usuarioId) {
            return true;
        }
        if (rolUsuario === 'paciente' && historia.pacienteId === usuarioId) {
            return true;
        }
        return false;
    }
    async buscarHistoriasPorDiagnostico(diagnostico) {
        return await this.historiaClinicaRepository
            .createQueryBuilder('historia')
            .leftJoinAndSelect('historia.paciente', 'paciente')
            .leftJoinAndSelect('historia.doctor', 'doctor')
            .where('historia.diagnostico LIKE :diagnostico', { diagnostico: `%${diagnostico}%` })
            .orderBy('historia.fechaConsulta', 'DESC')
            .getMany();
    }
    async obtenerEstadisticasHistorias() {
        const total = await this.historiaClinicaRepository.count();
        const ultimoMes = new Date();
        ultimoMes.setMonth(ultimoMes.getMonth() - 1);
        const recientes = await this.historiaClinicaRepository.count({
            where: {
                fechaConsulta: (0, typeorm_2.MoreThanOrEqual)(ultimoMes)
            }
        });
        return {
            total,
            recientes,
            promedioPorMes: Math.round(recientes)
        };
    }
};
exports.HistoriaClinicaService = HistoriaClinicaService;
exports.HistoriaClinicaService = HistoriaClinicaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(historia_clinica_entity_1.HistoriaClinica)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HistoriaClinicaService);
//# sourceMappingURL=historia-clinica.service.js.map