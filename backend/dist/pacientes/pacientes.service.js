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
exports.PacientesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const paciente_entity_1 = require("./entities/paciente.entity");
const user_entity_1 = require("../users/entities/user.entity");
let PacientesService = class PacientesService {
    constructor(pacientesRepository, usersRepository) {
        this.pacientesRepository = pacientesRepository;
        this.usersRepository = usersRepository;
    }
    async crearPaciente(pacienteData) {
        const paciente = this.pacientesRepository.create(pacienteData);
        return await this.pacientesRepository.save(paciente);
    }
    async obtenerPorUsuarioId(usuarioId) {
        const paciente = await this.pacientesRepository.findOne({
            where: { usuarioId },
            relations: ['usuario']
        });
        if (!paciente) {
            throw new common_1.NotFoundException('Información de paciente no encontrada');
        }
        return paciente;
    }
    async actualizarPaciente(usuarioId, actualizarData) {
        const paciente = await this.obtenerPorUsuarioId(usuarioId);
        Object.assign(paciente, actualizarData);
        return await this.pacientesRepository.save(paciente);
    }
    async obtenerTodosLosPacientes() {
        return await this.pacientesRepository.find({
            where: { activo: true },
            relations: ['usuario'],
            order: { fechaRegistro: 'DESC' }
        });
    }
    async buscarPacientePorIdentificacion(numeroIdentificacion) {
        return await this.pacientesRepository.findOne({
            where: { numeroIdentificacion },
            relations: ['usuario']
        });
    }
    async obtenerPacientesPorDoctor(doctorId) {
        const query = this.usersRepository
            .createQueryBuilder('usuario')
            .innerJoin('usuario.rol', 'rol')
            .leftJoin('citas', 'cita', 'cita.pacienteId = usuario.id')
            .where('rol.nombre = :rol', { rol: 'paciente' })
            .andWhere('cita.doctorId = :doctorId', { doctorId })
            .groupBy('usuario.id')
            .select(['usuario.id', 'usuario.nombre', 'usuario.apellido', 'usuario.email', 'usuario.telefono']);
        return await query.getMany();
    }
    async verificarPacienteExiste(usuarioId) {
        const count = await this.pacientesRepository.count({
            where: { usuarioId }
        });
        return count > 0;
    }
    async marcarPrimeraConsultaCompleta(usuarioId) {
        await this.pacientesRepository.update({ usuarioId }, { primeraConsulta: false });
    }
    async obtenerEstadisticasPacientes() {
        const total = await this.pacientesRepository.count({ where: { activo: true } });
        const nuevos = await this.pacientesRepository.count({
            where: {
                activo: true,
                primeraConsulta: true
            }
        });
        return {
            total,
            nuevos,
            regulares: total - nuevos
        };
    }
};
exports.PacientesService = PacientesService;
exports.PacientesService = PacientesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(paciente_entity_1.Paciente)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PacientesService);
//# sourceMappingURL=pacientes.service.js.map